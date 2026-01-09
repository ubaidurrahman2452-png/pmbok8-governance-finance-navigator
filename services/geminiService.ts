import { GoogleGenAI } from "@google/genai";
import { GenerationRequest, ProcessDomain } from "../types";
import { DOMAINS } from "../constants";

const getSystemInstruction = () => `
You are a PMBOK 8th Edition Expert and a Project Management Professional (PMP) consultant. 
Your specific role is to provide detailed ITTOs (Inputs, Tools, Techniques, Outputs) for specific processes based on user context.

Adhere to these Core Principles:
1. Value Delivery: Prioritize outcomes that deliver tangible value.
2. Sustainability: Consider environmental, social, and economic sustainability in all tools and outputs.
3. Clarity: Use professional, concise language.

Formatting:
- ALWAYS format the main ITTO content as a clear Markdown Table.
- Follow the table with a section titled "## AI Enhancement" explaining how GenAI tools can optimize this specific process.
- Follow that with a brief "## PMBOK 8 Alignment" section explaining the focus on Value and Sustainability.
`;

export const generateProcessITTO = async (request: GenerationRequest): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const domainConfig = DOMAINS[request.domain];

  const prompt = `
    Analyze the following Project Scenario and generate a PMBOK 8 ITTO guide for Domain ${domainConfig.title} (${domainConfig.subtitle}).

    **Project Scenario/Context:**
    ${request.context}

    **Process Requirements:**
    Focus: ${domainConfig.focus}
    
    **Required ITTO Elements to Include in the Table:**
    - Inputs: Include ${domainConfig.inputs.join(', ')} adjusted for the scenario.
    - Tools & Techniques: Include ${domainConfig.tools.join(', ')}. If relevant, include specific AI tools or sustainability analysis.
    - Outputs: Include ${domainConfig.outputs.join(', ')}.

    **Output Structure:**
    1. A brief executive summary of the process strategy (2-3 sentences).
    2. The ITTO Markdown Table. Columns: [Category (Input/Tool/Output), Item, Description/Application in Scenario].
    3. AI Enhancement Section.
    4. PMBOK 8 Alignment Section.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.4, // Lower temperature for more structured/factual responses
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate process documentation. Please try again.");
  }
};
