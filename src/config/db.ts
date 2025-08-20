import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    
  const env = process.env.NODE_ENV || "development";
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(`MONGODB_URI missing for NODE_ENV=${env}`);
    process.exit(1);
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    console.log(`MongoDB connected [${env}]`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
