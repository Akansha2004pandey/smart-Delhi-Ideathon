import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api",userRoute);
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
