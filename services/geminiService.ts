
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SkillType, Message, MissionStep } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Common system instruction for the "Cassette Futurism" persona
const SYSTEM_INSTRUCTION = `
You are MAINFRAME-99, a legacy operating system from the year 2142. 
The world is in a post-analog state. You communicate via a text-based terminal.
Your style is "Cassette Futurism" (think Alien, Blade Runner, 80s sci-fi).
You are training a new recruit (the User) in technical skills to maintain the colony systems.

Guidelines:
1. Speak in technical, slightly bureaucratic, retro-futuristic jargon.
2. Use uppercase for key terms.
3. Keep responses concise, suitable for a terminal readout.
4. Do not break character.
`;

const MISSION_GENERATION_MODEL = "gemini-2.5-flash";

interface MissionPlanResponse {
  title: string;
  steps: {
    briefing: string;
    objective: string;
    technicalGuide: string;
    commandSyntax: string;
    validationRegex: string;
    successMessage: string;
  }[];
}

export const generateMissionPlan = async (skill: SkillType): Promise<MissionStep[]> => {
  const prompt = `
    Create a multi-step training mission for learning ${skill}.
    Generate exactly 3 to 4 sequential steps.
    
    Scenario Context:
    - A specific system in the colony has failed.
    - The user must use ${skill} commands to fix it one step at a time.
    
    For each step, provide:
    1. briefing: Context for this specific step.
    2. objective: The instruction of what command to run (e.g. "List active containers").
    3. technicalGuide: Educational explanation of the concept (e.g. "Images are read-only templates...").
    4. commandSyntax: The syntax to help the user (e.g. "docker ps").
    5. validationRegex: A JavaScript-compatible regex string to match the user's expected command. Be flexible with flags/arguments (e.g. "docker\\s+(container\\s+)?ls" or "git\\s+status"). Ensure you escape backslashes for JSON string format.
    6. successMessage: What MAINFRAME-99 says when the user passes this step.

    Output JSON format only.
  `;

  const response = await ai.models.generateContent({
    model: MISSION_GENERATION_MODEL,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                briefing: { type: Type.STRING },
                objective: { type: Type.STRING },
                technicalGuide: { type: Type.STRING },
                commandSyntax: { type: Type.STRING },
                validationRegex: { type: Type.STRING },
                successMessage: { type: Type.STRING }
              },
              required: ["briefing", "objective", "technicalGuide", "commandSyntax", "validationRegex", "successMessage"]
            }
          }
        },
        required: ["title", "steps"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from MAINFRAME");
  
  const data = JSON.parse(text) as MissionPlanResponse;
  
  return data.steps.map((step, index) => ({
    id: index,
    ...step
  }));
};
