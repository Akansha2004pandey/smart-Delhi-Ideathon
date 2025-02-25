import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import chatroute from "./routes/chatroute.js";
import geminiRoute from "./routes/gemini-rag.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5174","http://localhost:3000","http://localhost:5173"],
    credentials: true,
})); 


app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api",userRoute);
app.use("/api",chatroute);
app.use("/api",geminiRoute);
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
