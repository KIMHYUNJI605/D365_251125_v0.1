import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, ensure API keys are handled securely via backend proxy.
// For this demo, we assume process.env.API_KEY is available or injected.
const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateAIResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    // Fallback if no API key is present for the UI demo
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("I'm simulating a response because the API Key is missing. In a real environment, I would summarize your day, suggest 5 actions, or draft a message based on your live CRM data.");
        }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AI service.";
  }
};