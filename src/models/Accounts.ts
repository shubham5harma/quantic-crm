import { Schema, model, Document } from "mongoose";

export interface IAccount extends Document {
  owner_id: string;
  name: string;
  industry?: string;
  created_at: Date;
}

const accountSchema = new Schema<IAccount>(
  {
    owner_id: { type: String, required: true, ref: "User" },
    name: { type: String, required: true },
    industry: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default model<IAccount>("Account", accountSchema);
