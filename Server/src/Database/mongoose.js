import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);
dotenv.config();
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.n23n9df.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("err: >> ", err);
  });
