import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function MyFoodScreen({ navigation }) {
  const { userRecipes, deleteRecipe } = useRecipes();

  const handleDelete = (recipe) => {
    Alert.alert('Delete Recipe', `Delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteRecipe(recipe.id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Food</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEditRecipe')}
      >
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>

      <Text style={styles.sectionLabel}>My Recipes</Text>

      {userRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            You haven't added any recipes yet. Tap "Add New Recipe" to create your first one.
          </Text>
        </View>
      ) : (
        <FlatList
          data={userRecipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeRow}
              onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={styles.rowInfo}>
                <Text style={styles.recipeName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.recipeMeta}>{item.category}</Text>
              </View>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('AddEditRecipe', { recipeId: item.id })}
              >
                <Ionicons name="create-outline" size={20} color="#4A90D9" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item)}>
                <Ionicons name="trash-outline" size={20} color="#E14D4D" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
  title: { fontSize: 22, fontWeight: '800', paddingHorizontal: 16, marginBottom: 12 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 15, marginLeft: 8 },
  sectionLabel: { fontSize: 16, fontWeight: '700', paddingHorizontal: 16, marginBottom: 8 },
  emptyState: { paddingHorizontal: 30, marginTop: 20 },
  emptyText: { textAlign: 'center', color: '#888', fontSize: 15 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  recipeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
  },
  thumb: { width: 56, height: 56, borderRadius: 10, marginRight: 10 },
  rowInfo: { flex: 1 },
  recipeName: { fontSize: 15, fontWeight: '700', color: '#222' },
  recipeMeta: { fontSize: 12, color: '#888', marginTop: 2 },
  iconButton: { padding: 8 },
});
