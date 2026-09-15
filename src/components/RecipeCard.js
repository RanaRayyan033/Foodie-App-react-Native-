import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

export default function RecipeCard({ recipe, onPress }) {
  const { isFavorite, toggleFavorite } = useRecipes();
  const favorited = isFavorite(recipe.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(recipe.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={20}
            color={favorited ? '#FF3B5C' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {recipe.name}
        </Text>
        <Text style={styles.meta}>
          {recipe.prepTime} • {recipe.difficulty}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 14,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 110,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 16,
    padding: 5,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  meta: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});
