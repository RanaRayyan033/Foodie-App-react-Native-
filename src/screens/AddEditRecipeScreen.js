import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRecipes } from '../context/RecipeContext';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function AddEditRecipeScreen({ route, navigation }) {
  const { recipeId } = route.params || {};
  const { getRecipeById, addRecipe, updateRecipe } = useRecipes();
  const editingRecipe = recipeId ? getRecipeById(recipeId) : null;

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setImage(editingRecipe.image);
      setIngredientsText(editingRecipe.ingredients.join('\n'));
      setInstructionsText(editingRecipe.instructions.join('\n'));
      setPrepTime(String(editingRecipe.prepTime));
      setServings(String(editingRecipe.servings));
      setCalories(String(editingRecipe.calories));
      setDifficulty(editingRecipe.difficulty);
    }
  }, [editingRecipe]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow photo library access to upload an image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled && result.assets?.length) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a recipe name.');
      return;
    }
    if (!ingredientsText.trim()) {
      Alert.alert('Missing ingredients', 'Please list at least one ingredient.');
      return;
    }
    if (!instructionsText.trim()) {
      Alert.alert('Missing instructions', 'Please add at least one instruction step.');
      return;
    }

    const recipeData = {
      name: name.trim(),
      image: image || 'https://picsum.photos/seed/newrecipe/400/300',
      ingredients: ingredientsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      instructions: instructionsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      prepTime: prepTime.trim() || 'N/A',
      servings: servings.trim() || 'N/A',
      calories: calories.trim() || 'N/A',
      difficulty,
      category: 'My Food',
    };

    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipeData);
    } else {
      addRecipe(recipeData);
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={32} color="#999" />
              <Text style={styles.imagePlaceholderText}>Tap to upload image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Creamy Garlic Pasta"
        />

        <View style={styles.rowInputs}>
          <View style={styles.rowInputItem}>
            <Text style={styles.label}>Prep Time</Text>
            <TextInput
              style={styles.input}
              value={prepTime}
              onChangeText={setPrepTime}
              placeholder="e.g. 30 mins"
            />
          </View>
          <View style={styles.rowInputItem}>
            <Text style={styles.label}>Servings</Text>
            <TextInput
              style={styles.input}
              value={servings}
              onChangeText={setServings}
              placeholder="e.g. 4"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.rowInputs}>
          <View style={styles.rowInputItem}>
            <Text style={styles.label}>Calories</Text>
            <TextInput
              style={styles.input}
              value={calories}
              onChangeText={setCalories}
              placeholder="e.g. 450"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.rowInputItem}>
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.difficultyRow}>
              {DIFFICULTIES.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.difficultyPill,
                    difficulty === level && styles.difficultyPillSelected,
                  ]}
                  onPress={() => setDifficulty(level)}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      difficulty === level && styles.difficultyTextSelected,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <Text style={styles.label}>Ingredients (one per line)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={ingredientsText}
          onChangeText={setIngredientsText}
          placeholder={'2 cups flour\n1 tsp salt\n...'}
          multiline
        />

        <Text style={styles.label}>Instructions (one step per line)</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={instructionsText}
          onChangeText={setInstructionsText}
          placeholder={'Preheat oven to 350°F\nMix dry ingredients\n...'}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  imagePicker: { marginBottom: 20 },
  previewImage: { width: '100%', height: 180, borderRadius: 12 },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: { color: '#999', marginTop: 8 },
  label: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },
  multiline: { height: 100, textAlignVertical: 'top' },
  rowInputs: { flexDirection: 'row', gap: 12 },
  rowInputItem: { flex: 1 },
  difficultyRow: { flexDirection: 'row' },
  difficultyPill: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F1F1',
    marginRight: 6,
  },
  difficultyPillSelected: { backgroundColor: '#FF6B35' },
  difficultyText: { fontSize: 12, color: '#333', fontWeight: '600' },
  difficultyTextSelected: { color: '#fff' },
  saveButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
