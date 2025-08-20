import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  role: "rep" | "manager";
  created_at: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["rep", "manager"], default: "rep" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model<IUser>("User", userSchema);
