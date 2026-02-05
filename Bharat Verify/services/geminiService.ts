
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { VerificationResult, VerificationStatus } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzeText = async (text: string): Promise<VerificationResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Analyze the following news content or claim for factual accuracy, bias, and credibility. 
  Provide a detailed verification report in JSON format.
  
  Content: "${text}"
  
  Structure your response to match this JSON schema:
  {
    "status": "Verified" | "Partially True" | "Unverified" | "False",
    "score": number (0-100),
    "summary": "Short 1-sentence summary",
    "explanation": "Detailed explanation citing findings",
    "biasScore": number (0-100, where 0 is neutral and 100 is highly biased),
    "credibilityScore": number (0-100),
    "anomalies": ["list of linguistic or logical inconsistencies"],
    "sources": [{"title": "Source name", "url": "URL if found"}]
  }`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      tools: [{ googleSearch: {} }]
    }
  });

  const rawJson = JSON.parse(response.text || "{}");
  
  // Extract sources from grounding metadata if available
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const groundingSources = groundingChunks.map((chunk: any) => ({
    title: chunk.web?.title || 'External Source',
    url: chunk.web?.uri || '#'
  })).filter((s: any) => s.url !== '#');

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    type: 'text',
    content: text,
    status: rawJson.status || VerificationStatus.UNVERIFIED,
    score: rawJson.score || 50,
    summary: rawJson.summary || "Unable to determine summary.",
    explanation: rawJson.explanation || "No detailed analysis available.",
    biasScore: rawJson.biasScore || 50,
    credibilityScore: rawJson.credibilityScore || 50,
    sources: [...(rawJson.sources || []), ...groundingSources],
    anomalies: rawJson.anomalies || []
  };
};

export const analyzeImage = async (base64Image: string): Promise<VerificationResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image.split(',')[1] || base64Image,
    },
  };

  const textPart = {
    text: `Analyze this image for signs of digital manipulation, deepfake characteristics, and contextual accuracy. 
    Look for: splicing, cloning, retouching, metadata inconsistencies, or AI-generated artifacts (e.g., in lighting, facial features).
    Provide a verification report in JSON format.
    
    Structure:
    {
      "status": "Verified" | "Partially True" | "Unverified" | "False",
      "isDeepfake": boolean,
      "score": number,
      "summary": "Summary of findings",
      "explanation": "Detailed forensic explanation",
      "anomalies": ["list of visual artifacts or inconsistencies"]
    }`
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [imagePart, textPart] },
  });

  let resultText = "";
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.text) resultText += part.text;
  }
  
  const jsonStr = resultText.replace(/```json|```/g, "").trim();
  const rawJson = JSON.parse(jsonStr || "{}");

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    type: 'image',
    content: "Image Content",
    status: rawJson.status || VerificationStatus.UNVERIFIED,
    score: rawJson.score || 50,
    summary: rawJson.summary || "Image analysis completed.",
    explanation: rawJson.explanation || "Standard forensic sweep performed.",
    biasScore: 0,
    credibilityScore: rawJson.score || 50,
    sources: [],
    anomalies: rawJson.anomalies || [],
    isDeepfake: rawJson.isDeepfake || false
  };
};

export const analyzeVideo = async (frames: string[]): Promise<VerificationResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const parts = frames.map(base64 => ({
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64.split(',')[1] || base64,
    },
  }));

  parts.push({
    text: `Analyze these sequential video frames for deepfake markers, synthetic speech-sync issues, and temporal inconsistencies.
    Perform a deep forensic sweep of the subject's facial movements, skin texture, and lighting across the frames.
    Identify if the person depicted is real or an AI-generated synthesis.
    
    Return the result in JSON format:
    {
      "status": "Verified" | "Partially True" | "Unverified" | "False",
      "isDeepfake": boolean,
      "score": number,
      "summary": "Forensic summary",
      "explanation": "Deep explanation of visual findings across frames",
      "anomalies": ["e.g., mismatched shadows, irregular blinking, texture warping"]
    }`
  } as any);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    contents: { parts: parts },
  });

  let resultText = "";
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.text) resultText += part.text;
  }
  
  const jsonStr = resultText.replace(/```json|```/g, "").trim();
  const rawJson = JSON.parse(jsonStr || "{}");

  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now(),
    type: 'video',
    content: "Video Content",
    status: rawJson.status || VerificationStatus.UNVERIFIED,
    score: rawJson.score || 50,
    summary: rawJson.summary || "Video forensic analysis complete.",
    explanation: rawJson.explanation || "Temporal consistency check performed.",
    biasScore: 0,
    credibilityScore: rawJson.score || 50,
    sources: [],
    anomalies: rawJson.anomalies || [],
    isDeepfake: rawJson.isDeepfake || false
  };
};
