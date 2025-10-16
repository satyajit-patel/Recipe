'use client';
import { useState } from 'react';

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecipes([]);

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
      } else {
        setRecipes(data.recipes || []);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-400">
          Subhrata's Kitchen
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                What ingredients do you have?
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., chicken, rice, onions, garlic, tomatoes..."
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? 'Finding Recipes...' : 'Find Recipes'}
            </button>
          </form>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {recipes.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-orange-300">Recipe Suggestions</h2>
              {recipes.map((recipe, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">{recipe.name}</h3>
                  <p className="text-gray-300 mb-4">{recipe.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-orange-300 mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-orange-300 mb-2">Steps:</h4>
                    <ol className="list-decimal list-inside text-gray-300 space-y-2">
                      {recipe.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
