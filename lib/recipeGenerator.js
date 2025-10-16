import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.7,
  apiKey: process.env.GROQ_API_KEY
});

const RECIPE_PROMPT = `You are a creative chef assistant. Given a list of ingredients, suggest 2-3 recipes that can be made using those ingredients.

Format your response as JSON:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "description": "Brief description",
      "ingredients": ["ingredient1", "ingredient2"],
      "steps": ["Step 1", "Step 2", "Step 3"]
    }
  ]
}

Guidelines:
- Use as many provided ingredients as possible
- Suggest realistic, cookable recipes
- Keep steps clear and concise
- If ingredients are insufficient, suggest what could be added`;

export async function generateRecipes(ingredients) {
  try {
    const response = await model.invoke(`${RECIPE_PROMPT}\n\nAvailable ingredients: ${ingredients}`);
    
    // Extract JSON from response if it's wrapped in markdown or other text
    let content = response.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error("Recipe generation error:", error);
    // Return fallback recipes if JSON parsing fails
    return {
      recipes: [{
        name: "Simple Stir Fry",
        description: "A quick dish with your available ingredients",
        ingredients: ingredients.split(',').map(i => i.trim()),
        steps: [
          "Heat oil in a pan",
          "Add ingredients and stir fry for 5-7 minutes",
          "Season with salt and pepper",
          "Serve hot"
        ]
      }]
    };
  }
}
