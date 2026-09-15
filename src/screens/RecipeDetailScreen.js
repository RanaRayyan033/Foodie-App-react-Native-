import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params;
  const { getRecipeById, isFavorite, toggleFavorite, deleteRecipe } = useRecipes();
  const recipe = getRecipeById(recipeId);

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const favorited = isFavorite(recipe.id);

  const handleDelete = () => {
    Alert.alert('Delete Recipe', `Are you sure you want to delete "${recipe.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteRecipe(recipe.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(recipe.id)}>
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={28}
            color={favorited ? '#FF3B5C' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.category}>{recipe.category}</Text>

        {/* Preparation time, servings, calories, difficulty */}
        <View style={styles.infoRow}>
          <View style={styles.infoChip}>
            <Ionicons name="time-outline" size={16} color="#FF6B35" />
            <Text style={styles.infoText}>{recipe.prepTime}</Text>
          </View>
          <View style={styles.infoChip}>
            <Ionicons name="people-outline" size={16} color="#FF6B35" />
            <Text style={styles.infoText}>{recipe.servings} servings</Text>
          </View>
          <View style={styles.infoChip}>
            <Ionicons name="flame-outline" size={16} color="#FF6B35" />
            <Text style={styles.infoText}>{recipe.calories} cal</Text>
          </View>
          <View style={styles.infoChip}>
            <Ionicons name="bar-chart-outline" size={16} color="#FF6B35" />
            <Text style={styles.infoText}>{recipe.difficulty}</Text>
          </View>
        </View>

        {recipe.isUserRecipe && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => navigation.navigate('AddEditRecipe', { recipeId: recipe.id })}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ing, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>{ing}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.stepNumber}>{idx + 1}.</Text>
            <Text style={styles.listText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 240 },
  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 8,
  },
  content: { padding: 20 },
  name: { fontSize: 24, fontWeight: '800', color: '#222' },
  category: { fontSize: 14, color: '#FF6B35', fontWeight: '600', marginTop: 4, marginBottom: 12 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1EB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  infoText: { marginLeft: 4, fontSize: 12, color: '#444', fontWeight: '600' },
  actionRow: { flexDirection: 'row', marginBottom: 16 },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  editButton: { backgroundColor: '#4A90D9' },
  deleteButton: { backgroundColor: '#E14D4D' },
  actionText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginTop: 16, marginBottom: 8 },
  listItem: { flexDirection: 'row', marginBottom: 6, paddingRight: 8 },
  bullet: { marginRight: 8, fontSize: 16, color: '#FF6B35' },
  stepNumber: { marginRight: 8, fontWeight: '700', color: '#FF6B35' },
  listText: { flex: 1, fontSize: 15, color: '#333', lineHeight: 21 },
});
