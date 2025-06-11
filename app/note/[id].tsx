import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Canvas } from '@/components/drawing/Canvas';
import { Toolbar } from '@/components/drawing/Toolbar';
import { ColorPicker } from '@/components/drawing/ColorPicker';
import { Slider } from '@/components/drawing/Slider';
import { TagInput } from '@/components/note/TagInput';
import { Note } from '@/types/note';

const { width, height } = Dimensions.get('window');

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState('pen');
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(2);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizeSlider, setShowSizeSlider] = useState(false);
  const [layers, setLayers] = useState<any[]>([]);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    loadNote();
  }, [id]);

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem(`note_${id}`);
      if (savedNote) {
        const parsedNote = JSON.parse(savedNote);
        setNote(parsedNote);
        setTitle(parsedNote.title);
        setContent(parsedNote.content);
        setTags(parsedNote.tags || []);
        setLayers(parsedNote.layers || []);
      }
    } catch (error) {
      console.error('노트 로드 실패:', error);
    }
  };

  const saveNote = async () => {
    try {
      const updatedNote = {
        ...note,
        id,
        title,
        content,
        tags,
        layers,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(`note_${id}`, JSON.stringify(updatedNote));
      setNote(updatedNote);
    } catch (error) {
      console.error('노트 저장 실패:', error);
    }
  };

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
    setShowColorPicker(false);
    setShowSizeSlider(false);
  };

  const handleColorSelect = (color: string) => {
    setPenColor(color);
    setShowColorPicker(false);
  };

  const handleSizeChange = (size: number) => {
    setPenSize(size);
    setShowSizeSlider(false);
  };

  const handleTagAdd = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="제목"
          style={styles.titleInput}
          mode="flat"
        />
        <TouchableOpacity onPress={saveNote} style={styles.saveButton}>
          <MaterialCommunityIcons name="content-save" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="내용을 입력하세요"
          multiline
          style={styles.contentInput}
          mode="flat"
        />
        
        <View style={styles.canvasContainer}>
          <Canvas
            ref={canvasRef}
            selectedTool={selectedTool}
            penColor={penColor}
            penSize={penSize}
            layers={layers}
            onLayersChange={setLayers}
          />
        </View>

        <TagInput
          tags={tags}
          onTagAdd={handleTagAdd}
          onTagRemove={handleTagRemove}
        />
      </ScrollView>

      <BlurView intensity={80} style={styles.toolbar}>
        <Toolbar
          selectedTool={selectedTool}
          onToolSelect={handleToolSelect}
          onColorSelect={() => setShowColorPicker(true)}
          onSizeSelect={() => setShowSizeSlider(true)}
        />
      </BlurView>

      {showColorPicker && (
        <View style={styles.modal}>
          <BlurView intensity={80} style={styles.modalContent}>
            <ColorPicker
              selectedColor={penColor}
              onColorSelect={handleColorSelect}
              onClose={() => setShowColorPicker(false)}
            />
          </BlurView>
        </View>
      )}

      {showSizeSlider && (
        <View style={styles.modal}>
          <BlurView intensity={80} style={styles.modalContent}>
            <Slider
              value={penSize}
              onValueChange={handleSizeChange}
              minimumValue={1}
              maximumValue={20}
              step={1}
            />
          </BlurView>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  titleInput: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
  saveButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentInput: {
    padding: 16,
    backgroundColor: 'transparent',
  },
  canvasContainer: {
    height: height * 0.4,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 16,
    borderRadius: 12,
    width: width * 0.8,
  },
}); 