import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY );
const router = express.Router();

router.get("/gemini-rag", async (req, res) => {
  try {
    const query = req.query.query;
    console.log("Received query:", query);
    const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
    let firebaseDocs = [];
    if (req.query.context) {
      firebaseDocs = JSON.parse(req.query.context).firebaseDocs;
      console.log("Parsed context:", firebaseDocs);
    } else {
      console.log("No context provided");
    }
    const contextText = firebaseDocs
      .map((doc, index) => {
        return `Document ${index + 1}:\nQuestion: ${doc.query}\nResponse: ${doc.response}`;
      })
      .join("\n\n");
    
    const prompt = `
You are an expert assistant. Given the following context from Firebase documents:
${contextText}

Answer the following question:
${query}

Answer:
`;

    console.log("Constructed prompt:", prompt);
    console.log("hello I do not know the problme");

    const result = await model.generateContent(prompt);
     
    const answer = result.candidates
      ? result.candidates[0].output
      : result.response?.text();
    console.log("Here is the answer");
    console.log(answer);
    res.status(200).json({
      message: "Prompt processed successfully",
      answer: answer,
    });
  } catch (error) {
    console.error("Error in /gemini-rag route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
