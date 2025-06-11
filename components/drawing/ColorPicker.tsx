import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onClose: () => void;
}

const COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
  '#008000', '#800000', '#008080', '#000080', '#808080',
  '#FFC0CB', '#A52A2A', '#7FFFD4', '#DEB887', '#5F9EA0',
];

export function ColorPicker({ selectedColor, onColorSelect, onClose }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>색상 선택</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.colorList}>
        <View style={styles.colorGrid}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorItem,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor,
              ]}
              onPress={() => onColorSelect(color)}
            >
              {selectedColor === color && (
                <MaterialCommunityIcons name="check" size={24} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  colorList: {
    maxHeight: 300,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  colorItem: {
    width: 40,
    height: 40,
    margin: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
}); 