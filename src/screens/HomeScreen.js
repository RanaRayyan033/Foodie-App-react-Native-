import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import CategoryPill from '../components/CategoryPill';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

export default function HomeScreen({ navigation }) {
  const { categories, allRecipes, isLoaded } = useRecipes();

  // "My Food" is appended to the same horizontal categories bar, as required.
  const displayCategories = [...categories, 'My Food'];

  const handleCategoryPress = (category) => {
    if (category === 'My Food') {
      // Cross-tab navigation into the "My Food" tab.
      navigation.getParent()?.navigate('My Food');
    } else {
      navigation.navigate('CategoryRecipes', { category });
    }
  };

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading recipes...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Foodie 🍳</Text>

      <Text style={styles.sectionLabel}>Categories</Text>
      <FlatList
        data={displayCategories}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <CategoryPill label={item} onPress={() => handleCategoryPress(item)} />
        )}
      />

      <Text style={styles.sectionLabel}>All Recipes</Text>
      <FlatList
        data={allRecipes}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  loading: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#888' },
  title: { fontSize: 26, fontWeight: '800', paddingHorizontal: 16, marginBottom: 8 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  categoryList: { paddingHorizontal: 16 },
  grid: { paddingHorizontal: 12, paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  gridItem: { flex: 1, marginHorizontal: 4, marginBottom: 12 },
});
