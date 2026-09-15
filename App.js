import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RecipeProvider } from './src/context/RecipeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <RecipeProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </RecipeProvider>
  );
}
