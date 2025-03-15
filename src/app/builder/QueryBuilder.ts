import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.query?.search as string;

        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' }
                }) as FilterQuery<T>),
            });
        }

        return this;
    }

    filter() {
        const excludedFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields']; 
        const queryObj = { ...this.query };

        excludedFields.forEach((el) => delete queryObj[el]); 

        // Filtering based on 'filter' query parameter
        const filterTerm = this.query?.filter as string;
        if (filterTerm) {
            this.modelQuery = this.modelQuery.find({ author: filterTerm } as FilterQuery<T>);
        } else {
            this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        }

        return this;
    }

    sort() {
        const sortBy = this.query?.sortBy as string || 'createdAt'; // default to createdAt
        const sortOrder = this.query?.sortOrder as string || 'asc'; // default to ascending

        const sortObj = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
        this.modelQuery = this.modelQuery.sort(sortObj);

        return this;
    }

    paginate() {
        const page = Number(this.query?.page) || 1; 
        const limit = Number(this.query?.limit) || 3;
        const skip = (page - 1) * limit; 

        this.modelQuery = this.modelQuery.skip(skip).limit(limit); 

        return this;
    }

    fields() {
        const wantedFields = (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';

        this.modelQuery = this.modelQuery.select(wantedFields); 
        return this;
    }
}

export default QueryBuilder;
