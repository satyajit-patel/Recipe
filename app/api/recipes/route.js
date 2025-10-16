import { validateIngredients } from '../../../lib/ingredientValidator';
import { generateRecipes } from '../../../lib/recipeGenerator';

export async function POST(request) {
  try {
    const { ingredients } = await request.json();
    
    if (!ingredients || ingredients.trim().length === 0) {
      return Response.json({ error: 'Please provide ingredients' }, { status: 400 });
    }

    const isValid = await validateIngredients(ingredients);
    
    if (!isValid) {
      return Response.json({ 
        error: 'Please provide valid cooking ingredients like vegetables, spices, meat, etc.' 
      }, { status: 400 });
    }

    const recipes = await generateRecipes(ingredients);
    return Response.json(recipes);
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
