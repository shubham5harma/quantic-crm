import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  owner_id: mongoose.Types.ObjectId;
  name: string;
  company?: string;
  status: "new" | "contacted" | "qualified";
  created_at: Date;
  updated_at: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    company: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified"],
      default: "new",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<ILead>("Lead", LeadSchema);
