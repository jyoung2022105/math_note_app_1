import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TagInputProps {
  tags: string[];
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

export function TagInput({ tags, onTagAdd, onTagRemove }: TagInputProps) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagAdd(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>태그</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          value={newTag}
          onChangeText={setNewTag}
          placeholder="태그 추가"
          style={styles.input}
          mode="outlined"
          right={
            <TextInput.Icon
              icon="plus"
              onPress={handleAddTag}
              disabled={!newTag.trim()}
            />
          }
          onSubmitEditing={handleAddTag}
        />
      </View>

      <View style={styles.tagList}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            style={styles.tag}
            onClose={() => onTagRemove(tag)}
            closeIcon="close"
          >
            {tag}
          </Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
}); 