import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const generateProductDescription = async (name: string, category: string, keyFeatures: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key not found. Returning mock description.");
    return `A high-quality ${name} in the ${category} category. ${keyFeatures}`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `Write a short, appealing marketing description (max 2 sentences) for a farm product.\n    Product Name: ${name}\n    Category: ${category}\n    Key Features: ${keyFeatures}\n    \n    Tone: Fresh, organic, appetizing.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text || "Description generation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate description at this time.";
  }
};

export interface Recipe {
  title: string;
  time: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

export const generateRecipesFromIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  if (!ingredients.length) return [];
  
  if (!apiKey) {
      // Mock return for demo without key
      return [
          {
              title: "Farm Fresh Salad",
              time: "15 mins",
              difficulty: "Easy",
              ingredients: [...ingredients, "Olive Oil", "Lemon"],
              instructions: ["Wash all vegetables.", "Chop into bite-sized pieces.", "Toss with olive oil and lemon.", "Season with salt and pepper."]
          },
          {
              title: "Roasted Vegetable Medley",
              time: "45 mins",
              difficulty: "Medium",
              ingredients: [...ingredients, "Herbs", "Garlic"],
              instructions: ["Preheat oven to 400°F (200°C).", "Cut vegetables evenly.", "Toss with oil and herbs.", "Roast for 30-40 minutes until tender."]
          }
      ];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `Suggest 3 creative recipes using some or all of these ingredients: ${ingredients.join(', ')}. Assume standard pantry items are available.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Recipe generation failed:", error);
    return [];
  }
};

export interface GeneratedNewsItem {
  title: string;
  summary: string;
  date: string;
  category: string;
}

export const generateFarmingNews = async (): Promise<GeneratedNewsItem[]> => {
  if (!apiKey) {
      return [
        { title: "AI Forecasts Record Wheat Yields", summary: "New predictive models suggest a bumper crop this season due to favorable weather patterns.", date: new Date().toISOString().split('T')[0], category: "Technology" },
        { title: "Sustainable Irrigation Breakthrough", summary: "New drip systems reduce water usage by 40% while maintaining yield.", date: new Date().toISOString().split('T')[0], category: "Sustainability" },
        { title: "Local Markets See Surge in Demand", summary: "Consumers are increasingly turning to local farmers for fresh produce.", date: new Date().toISOString().split('T')[0], category: "Market Trends" },
        { title: "Vertical Farming Expansion", summary: "Urban centers are adopting vertical farming to reduce transport costs.", date: new Date().toISOString().split('T')[0], category: "Innovation" }
      ];
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `Generate 4 realistic, interesting news articles about modern agriculture, farming technology, or sustainable practices. \n    Use today's date or recent dates.\n    Return a JSON array.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("News generation failed:", error);
    return [];
  }
};

// Use a simplified product interface for AI processing to reduce token usage
interface SimpleProduct {
    id: string;
    name: string;
    category: string;
    description: string;
}

export const recommendProductsForMeal = async (mealQuery: string, availableProducts: SimpleProduct[]): Promise<string[]> => {
    if (!apiKey) {
        console.warn("API Key missing, returning empty recommendation.");
        return [];
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const inventoryString = JSON.stringify(availableProducts);

        const prompt = `\n        You are an intelligent shopping assistant for a farm-to-table marketplace.\n        \n        User Query: "I want to cook: ${mealQuery}"\n        \n        Available Inventory (JSON):\n        ${inventoryString}\n        \n        Task: Identify which products from the inventory are suitable ingredients for the user's meal.\n        Return a JSON object with a property "productIds" which is an array of strings (the IDs of the matching products).\n        Only select products that are strictly relevant.\n        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (text) {
            const data = JSON.parse(text);
            return data.productIds || [];
        }
        return [];
    } catch (error) {
        console.error("Shopping assistant error:", error);
        return [];
    }
};

export const getAgriAdvisorAdvice = async (
  role: 'farmer' | 'customer', 
  inputs: { location: string; details: string; season: string }
): Promise<string> => {
  if (!apiKey) {
    return "API Key missing. Cannot generate expert advice.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    let prompt = "";
    if (role === 'farmer') {
      prompt = `\n      Act as an expert Agronomist and Agricultural Strategist.\n      \n      Context:\n      - Location: ${inputs.location}\n      - Current Season/Month: ${inputs.season}\n      - Farm Details/Soil Type: ${inputs.details}\n      \n      Task: Provide a detailed strategic plan for this farmer.\n      1. Recommend specific crops to plant NOW based on the location and soil.\n      2. Analyze potential pests or diseases to watch out for in this region/season.\n      3. Suggest one innovative sustainable practice relevant to these details.\n      4. Provide a brief market outlook for the recommended crops.\n      \n      Format the response in clean Markdown with headers.\n      `;
    } else {
      prompt = `\n      Act as a Senior Nutritionist and Farm-to-Table Chef.\n      \n      Context:\n      - Location: ${inputs.location}\n      - Current Season/Month: ${inputs.season}\n      - User Preferences: ${inputs.details}\n      \n      Task: Provide a comprehensive seasonal eating guide.\n      1. List the "Superfoods of the Season" available locally in this region right now.\n      2. Explain the specific nutritional benefits of these items.\n      3. Provide tips on how to select the freshest version of these produce items.\n      4. Suggest a simple preservation technique (canning, freezing, drying) for one of these items.\n      \n      Format the response in clean Markdown with headers.\n      `;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text || "Could not generate advice.";
  } catch (error) {
    console.error("Advisor generation failed:", error);
    return "An error occurred while generating advice. Please try again later.";
  }
};
