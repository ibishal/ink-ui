
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getHint(levelTitle: string, objective: string, code: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am playing a CTF called ink!Spector Gadget. 
        The level is "${levelTitle}". 
        The objective is: ${objective}.
        Here is the ink! smart contract source code:
        \`\`\`rust
        ${code}
        \`\`\`
        Can you give me a subtle hint about how to exploit this contract without giving away the full solution? Explain the vulnerability concept.`,
        config: {
          systemInstruction: "You are an expert in ink! smart contract security. Provide concise, helpful hints for CTF players. Use technical but understandable language.",
          temperature: 0.7,
        }
      });
      return response.text || "I'm having trouble analyzing this contract. Check for common ink! patterns like Reentrancy or Access Control.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to reach the security assistant. Try manually inspecting the storage update order.";
    }
  }

  async analyzeCode(code: string): Promise<{ audit: string; severity: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this ink! contract for vulnerabilities:
        \`\`\`rust
        ${code}
        \`\`\`
        Provide a brief security audit report in JSON format with "audit" and "severity" fields.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              audit: { type: Type.STRING },
              severity: { type: Type.STRING }
            },
            required: ["audit", "severity"]
          }
        }
      });
      return JSON.parse(response.text || '{"audit": "No issues found", "severity": "low"}');
    } catch (error) {
      return { audit: "Audit service unavailable", severity: "Unknown" };
    }
  }
}
