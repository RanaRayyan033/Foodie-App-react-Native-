import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

export default function CategoryRecipesScreen({ route, navigation }) {
  const { category } = route.params;
  const { getRecipesByCategory } = useRecipes();
  const recipes = getRecipesByCategory(category);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      {recipes.length === 0 ? (
        <Text style={styles.empty}>No recipes found in this category yet.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <RecipeCard
                recipe={item}
                onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  title: { fontSize: 20, fontWeight: '800', paddingHorizontal: 16, marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: '#888' },
  grid: { paddingHorizontal: 12, paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  gridItem: { flex: 1, marginHorizontal: 4, marginBottom: 12 },
});
