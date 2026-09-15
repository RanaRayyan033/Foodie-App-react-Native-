import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryPill({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.pill, selected && styles.pillSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    marginRight: 10,
  },
  pillSelected: {
    backgroundColor: '#FF6B35',
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  labelSelected: {
    color: '#fff',
  },
});
