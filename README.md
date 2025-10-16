# Subhrata's Kitchen - Recipe Finder

A smart recipe finder application that suggests recipes based on your available ingredients using AI.

## Features

- **Ingredient Validation**: Ensures only cooking ingredients are accepted
- **AI-Powered Recipe Generation**: Creates 2-3 recipes with step-by-step instructions
- **Dark Theme**: Modern blackish UI with orange accents
- **Real-time Processing**: Instant recipe suggestions

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **AI**: Groq API with Llama 3.3 70B model via LangChain
- **Styling**: Tailwind CSS with dark theme

**Live link** [https://recipe-tawny-iota.vercel.app/](https://recipe-tawny-iota.vercel.app)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd recipe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## Deploy on Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variable: `GROQ_API_KEY`
   - Deploy

3. **Alternative: Vercel CLI**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

## Usage

1. Enter your available ingredients (e.g., "chicken, rice, onions, garlic")
2. Click "Find Recipes"
3. Get AI-generated recipes with ingredients and step-by-step instructions

## API Endpoints

- `POST /api/recipes` - Generate recipes from ingredients

## Project Structure

```
├── app/
│   ├── api/recipes/route.js    # Recipe API endpoint
│   ├── page.js                 # Main UI component
│   └── layout.js               # App layout
├── lib/
│   ├── ingredientValidator.js  # Input validation
│   └── recipeGenerator.js      # Recipe generation
└── .env.local                  # Environment variables
```
