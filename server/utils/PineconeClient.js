import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

export const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const indexName = 'sahasi-she';

async function setupIndex() {
  try {
    const existingIndexes = await pc.listIndexes();
    let indexesArray = Array.isArray(existingIndexes)
      ? existingIndexes
      : (existingIndexes.indexes || []);

    if (!indexesArray.includes(indexName)) {
      console.log(`Index "${indexName}" not found. Creating it...`);
      await pc.createIndex({
        name: indexName,
        dimension: 1536,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        },
        deletionProtection: 'disabled',
        tags: { environment: 'development' },
      });
      console.log(`Index "${indexName}" created successfully.`);
    } else {
      console.log(`Index "${indexName}" already exists.`);
    }
  } catch (error) {

    if (error.name === 'PineconeConflictError') {
      console.log(`Index "${indexName}" already exists (caught conflict error).`);
    } else {
      throw error;
    }
  }
}

await setupIndex();
