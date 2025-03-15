import { Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser, TUserModel } from "./user.interface"; 
import { AppError } from "../../errors/error";


// Create the user schema
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static methods

// Check if user exists and return block status
userSchema.statics.isUserExists = async function (userEmail: string) {
  const user = await this.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(401, "User does not exist!");
  }
  return { user, isBlocked: user.isBlocked };
};

// Check if the provided password matches the stored password
userSchema.statics.isPasswordMatched = async function (userEmail: string, password: string) {
  const user = await this.findOne({ email: userEmail }).select("email password");
  if (!user) return false;
  const matched = await bcrypt.compare(password, user.password);
  return matched;
};

// ✅ Create the UserModel and cast it to the UserModel interface
export const UserModel = model<TUser, TUserModel>("Users", userSchema);
