"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' }
                })),
            });
        }
        return this;
    }
    filter() {
        var _a;
        const excludedFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields'];
        const queryObj = Object.assign({}, this.query);
        excludedFields.forEach((el) => delete queryObj[el]);
        // Filtering based on 'filter' query parameter
        const filterTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.filter;
        if (filterTerm) {
            this.modelQuery = this.modelQuery.find({ author: filterTerm });
        }
        else {
            this.modelQuery = this.modelQuery.find(queryObj);
        }
        return this;
    }
    // sort() {
    //     const sortBy = this.query?.sortBy as string || 'createdAt'; // default to createdAt
    //     const sortOrder = this.query?.sortOrder as string || 'asc'; // default to ascending
    //     const sortObj = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    //     this.modelQuery = this.modelQuery.sort(sortObj);
    //     return this;
    // }
    sort() {
        var _a, _b;
        const sortBy = ((_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || 'createdAt'; // default to createdAt
        const sortOrder = ((_b = this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === 'asc' ? 1 : -1; // default to ascending
        const sortObj = { [sortBy]: sortOrder };
        this.modelQuery = this.modelQuery.sort(sortObj);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) || 100;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const wantedFields = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(wantedFields);
        return this;
    }
}
exports.default = QueryBuilder;
