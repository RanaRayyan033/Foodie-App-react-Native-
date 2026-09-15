import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

export default function FavoritesScreen({ navigation }) {
  const { favoriteRecipes } = useRecipes();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites ❤️</Text>
      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No favorites yet. Tap the heart icon on any recipe to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
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
  title: { fontSize: 22, fontWeight: '800', paddingHorizontal: 16, marginBottom: 12 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  emptyText: { textAlign: 'center', color: '#888', fontSize: 15 },
  grid: { paddingHorizontal: 12, paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  gridItem: { flex: 1, marginHorizontal: 4, marginBottom: 12 },
});
