# Foodie-App-react-Native-
# Foodie 🍳

A recipe app built with React Native + Expo. Browse recipes by category,
view full recipe details, favorite recipes, and add/edit/delete your own
recipes in "My Food."

## Running the project

```bash
npm install
npx expo start
```

Then scan the QR code with **Expo Go** (iOS/Android), or press `w` for web.

## Importing into Snack Expo

1. Push this folder to a public GitHub repository (see below).
2. Go to https://snack.expo.dev
3. Click **"Import Git Repository"** and paste your repo URL.

## Pushing to GitHub

```bash
cd foodie-app
git init
git add .
git commit -m "Initial commit: Foodie recipe app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

## Project structure

```
foodie-app/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── data/
    │   └── recipesData.js        # 14 seed recipes across 14 categories
    ├── context/
    │   └── RecipeContext.js      # global state + AsyncStorage persistence
    ├── navigation/
    │   └── AppNavigator.js       # bottom tabs + nested stacks (back buttons)
    ├── components/
    │   ├── CategoryPill.js
    │   └── RecipeCard.js
    └── screens/
        ├── HomeScreen.js
        ├── CategoryRecipesScreen.js
        ├── RecipeDetailScreen.js
        ├── FavoritesScreen.js
        ├── MyFoodScreen.js
        └── AddEditRecipeScreen.js
```

## Feature checklist

| # | Requirement | Where it's implemented |
|---|---|---|
| 2 | 10+ categories, horizontal | `HomeScreen.js` — 14 seed categories + "My Food" |
| 3 | Ingredients, instructions, prep time, servings, calories, difficulty | `RecipeDetailScreen.js` |
| 4 | Tap category → filtered recipes | `CategoryRecipesScreen.js` |
| 5 | Heart icon toggles favorite | `RecipeCard.js`, `RecipeDetailScreen.js` |
| 6 | Favorites section | `FavoritesScreen.js` |
| 7 | "My Food" in categories bar with "Add New Recipe" | `HomeScreen.js` → `MyFoodScreen.js` |
| 8 | Add recipe form (name, image, ingredients, instructions, Save button) | `AddEditRecipeScreen.js` |
| 9 | New recipe appears in "My Recipes" | `RecipeContext.js` + `MyFoodScreen.js` |
| 10 | Tap "My Recipes" item → full details | `RecipeDetailScreen.js` |
| 11 | Edit/Delete buttons, functional | `MyFoodScreen.js`, `RecipeDetailScreen.js` |
| 12 | Functional back button | Native stack navigators in `AppNavigator.js` |

Data (favorites and user-added recipes) is persisted locally via
`@react-native-async-storage/async-storage`, so it survives app restarts.
