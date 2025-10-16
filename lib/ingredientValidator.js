import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY
});

const VALIDATION_PROMPT = `You are an ingredient validator. Your job is to determine if the given input contains valid cooking ingredients.

Rules:
- Return "VALID" if the input contains food ingredients, spices, or cooking items
- Return "INVALID" if the input contains non-food items, random text, or inappropriate content
- Be strict but reasonable - common cooking ingredients should be valid

Examples:
- "tomatoes, onions, garlic" → VALID
- "chicken, rice, salt" → VALID
- "car, phone, computer" → INVALID
- "hello world" → INVALID

Respond with only "VALID" or "INVALID".`;

export async function validateIngredients(ingredients) {
  try {
    const response = await model.invoke(`${VALIDATION_PROMPT}\n\nInput: ${ingredients}`);
    return response.content.trim() === "VALID";
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
}
