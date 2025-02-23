import express from "express";
import { queries } from "../utils/queries.js";
import { pc } from "../utils/PineconeClient.js";
import { collection, addDoc, query as firebaseQuery, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig.js";
const router = express.Router();
function adjustEmbedding(embedding, targetDimension = 1536) {
  if (embedding.length < targetDimension) {
    const padding = new Array(targetDimension - embedding.length).fill(0);
    return embedding.concat(padding);
  } else if (embedding.length > targetDimension) {
    return embedding.slice(0, targetDimension);
  }
  return embedding;
}
router.post("/addData", async (req, res) => {
  try {
    const data = queries; 
    const namespace = "chatbot"; 
    const model = 'multilingual-e5-large';
    const pineconeIndex = 'sahasi-she'; 
    const index = pc.Index(pineconeIndex);
    for (let i = 0; i < data.length; i++) {
      const combinedText = `${data[i].query} ${data[i].response}`;
      const uniqueId = `vector-${Date.now()}-${i}`;
      const embeddings = await pc.inference.embed(
        model,
        [combinedText],
        { inputType: 'passage', truncate: 'END' }
      );
      const originalEmbedding = embeddings.data[0].values;
      const adjustedEmbedding = adjustEmbedding(originalEmbedding, 1536);
      await index.namespace(namespace).upsert([
        {
          id: uniqueId,
          values: adjustedEmbedding,
          metadata: {
            query: data[i].query,
            response: data[i].response,
          },
        },
      ]);
      console.log(`Data added to Pinecone successfully for ${uniqueId}`);
      
      const firebasedoc = {
         id: uniqueId,
         query: data[i].query,
         response: data[i].response,
      };
      await addDoc(collection(db, "chatbot"), firebasedoc);
      console.log(`Data added to Firebase successfully for ${uniqueId}`);
    }
    res.status(200).json({ message: "Data added successfully" });
  } catch (err) {
    console.error("Error generating embeddings:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/getContext", async (req, res) => { 
  try {
    const namespace = "chatbot";
    const model = 'multilingual-e5-large';
    const pineconeIndex = 'sahasi-she';
    const index = pc.Index(pineconeIndex);
    const queryText = req.query.query;
    const embeddingResponse = await pc.inference.embed(
      model,
      [queryText],
      { inputType: 'passage', truncate: 'END' }
    );
    const queryEmbedding = embeddingResponse.data[0].values;
    const adjustedQueryEmbedding = adjustEmbedding(queryEmbedding, 1536);
    const results = await index.namespace(namespace).query({
      topK: 3,
      includeValues: true,
      includeMetadata: true,
      vector: adjustedQueryEmbedding, 
    });
    console.log("Query embedding:", queryEmbedding);
    const firebaseIds = results.matches.map(match => match.id);
    const fbCollectionRef = collection(db, "chatbot");
    const firebaseQueryRef = firebaseQuery(fbCollectionRef, where("id", "in", firebaseIds));
    const querySnapshot = await getDocs(firebaseQueryRef);
    const firebaseDocs = [];
    querySnapshot.forEach(doc => {
      firebaseDocs.push(doc.data());
    });
    console.log("Query results:", results);
    res.status(200).json({ firebaseDocs: firebaseDocs });
  } catch (err) {
    console.error("Error generating embeddings:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/addQuery", async (req, res) => {
  try {
    
    const data = JSON.parse(req.query.query); 
    const namespace = "chatbot";
    const model = "multilingual-e5-large";
    const pineconeIndex = "sahasi-she";
    const index = pc.Index(pineconeIndex);

    
    const combinedText = `${data.query} ${data.response}`;

    
    const stats = await index.describeIndexStats();
    let currentCount = 0;
    if (stats.namespaces && stats.namespaces[namespace]) {
      currentCount = stats.namespaces[namespace].vectorCount;
    }
    if (currentCount >= 200) {
      return res.status(400).json({ 
        message: "Maximum vector count reached. Cannot add more vectors." 
      });
    }
    const uniqueId = `vector-${Date.now()}-${currentCount}`;

  
    const embeddings = await pc.inference.embed(
      model,
      [combinedText],
      { inputType: "passage", truncate: "END" }
    );
    const originalEmbedding = embeddings.data[0].values;
    const adjustedEmbedding = adjustEmbedding(originalEmbedding, 1536);
    await index.namespace(namespace).upsert([
      {
        id: uniqueId,
        values: adjustedEmbedding,
        metadata: {
          query: data.query,
          response: data.response,
        },
      },
    ]);
    console.log(`Data added to Pinecone successfully for ${uniqueId}`);
    
    const firebasedoc = {
      id: uniqueId,
      query: data.query,
      response: data.response,
    };
    await addDoc(collection(db, "chatbot"), firebasedoc);
    console.log(`Data added to Firebase successfully for ${uniqueId}`);

    res.status(200).json({ message: "Data added successfully" });
  } catch (err) {
    console.error("Error adding query:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
