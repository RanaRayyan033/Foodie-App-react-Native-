import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import CategoryRecipesScreen from '../screens/CategoryRecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyFoodScreen from '../screens/MyFoodScreen';
import AddEditRecipeScreen from '../screens/AddEditRecipeScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();
const MyFoodStack = createNativeStackNavigator();

// Each stack below gets a native header with an automatic, functional
// back button whenever a screen is pushed on top of another.

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeFeed" component={HomeScreen} options={{ title: 'Foodie' }} />
      <HomeStack.Screen
        name="CategoryRecipes"
        component={CategoryRecipesScreen}
        options={({ route }) => ({ title: route.params?.category ?? 'Category' })}
      />
      <HomeStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Recipe Details' }}
      />
      <HomeStack.Screen
        name="AddEditRecipe"
        component={AddEditRecipeScreen}
        options={({ route }) => ({
          title: route.params?.recipeId ? 'Edit Recipe' : 'Add New Recipe',
        })}
      />
    </HomeStack.Navigator>
  );
}

function FavStackScreen() {
  return (
    <FavStack.Navigator>
      <FavStack.Screen
        name="FavoritesList"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
      <FavStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Recipe Details' }}
      />
      <FavStack.Screen
        name="AddEditRecipe"
        component={AddEditRecipeScreen}
        options={({ route }) => ({
          title: route.params?.recipeId ? 'Edit Recipe' : 'Add New Recipe',
        })}
      />
    </FavStack.Navigator>
  );
}

function MyFoodStackScreen() {
  return (
    <MyFoodStack.Navigator>
      <MyFoodStack.Screen
        name="MyFoodHome"
        component={MyFoodScreen}
        options={{ title: 'My Food' }}
      />
      <MyFoodStack.Screen
        name="AddEditRecipe"
        component={AddEditRecipeScreen}
        options={({ route }) => ({
          title: route.params?.recipeId ? 'Edit Recipe' : 'Add New Recipe',
        })}
      />
      <MyFoodStack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{ title: 'Recipe Details' }}
      />
    </MyFoodStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#FF6B35',
          tabBarIcon: ({ color, size }) => {
            let iconName = 'home';
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Favorites') iconName = 'heart';
            else if (route.name === 'My Food') iconName = 'fast-food';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Favorites" component={FavStackScreen} />
        <Tab.Screen name="My Food" component={MyFoodStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
