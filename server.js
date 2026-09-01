import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini Client
// Requires GEMINI_API_KEY in environment
let ai = null;
try {
  ai = new GoogleGenAI({});
} catch (error) {
  console.warn("GoogleGenAI initialized without API key. Please set GEMINI_API_KEY.");
}

app.post('/api/chat', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API client not initialized. Set GEMINI_API_KEY." });
    }
    
    const { prompt, systemInstruction } = req.body;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are Sahayak, a helpful assistant for India's Census 2027.",
        }
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Gemini." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
