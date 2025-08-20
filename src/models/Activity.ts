import mongoose, { Document, Schema } from "mongoose";

export interface IActivity extends Document {
  owner_id: string;
  subject: string;
  type: "call" | "email" | "meeting" | "task";
  due_date?: Date;
  lead_id?: string;
  account_id?: string;
  notes?: string;
  created_at: Date;
}

const ActivitySchema = new Schema<IActivity>({
  owner_id: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, enum: ["call", "email", "meeting", "task"], required: true },
  due_date: { type: Date },
  lead_id: { type: Schema.Types.ObjectId, ref: "Lead" },
  account_id: { type: Schema.Types.ObjectId, ref: "Account" },
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>("Activity", ActivitySchema);
