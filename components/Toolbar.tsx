import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type Tool = 'pen' | 'highlighter' | 'eraser' | 'lasso' | 'select';

interface ToolbarProps {
  selectedTool: Tool;
  onToolSelect: (tool: Tool) => void;
  penColor: string;
  penSize: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
}

const tools: { id: Tool; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'pen', icon: 'pencil' },
  { id: 'highlighter', icon: 'brush' },
  { id: 'eraser', icon: 'trash' },
  { id: 'lasso', icon: 'git-branch' },
  { id: 'select', icon: 'hand-left' },
];

export function Toolbar({
  selectedTool,
  onToolSelect,
  penColor,
  penSize,
  onColorChange,
  onSizeChange,
}: ToolbarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.toolsContainer}>
        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.id}
            style={[
              styles.toolButton,
              selectedTool === tool.id && styles.selectedTool,
            ]}
            onPress={() => onToolSelect(tool.id)}
          >
            <Ionicons
              name={tool.icon}
              size={24}
              color={selectedTool === tool.id ? '#007AFF' : '#000'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  toolButton: {
    padding: 8,
    borderRadius: 8,
  },
  selectedTool: {
    backgroundColor: '#E3F2FD',
  },
}); 