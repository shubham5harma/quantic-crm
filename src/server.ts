import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 4000;
const nodeEnv = process.env.NODE_ENV || "development";

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running in ${nodeEnv} mode on http://localhost:${PORT}`);
  });
})();
