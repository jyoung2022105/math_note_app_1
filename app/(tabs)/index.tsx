import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NoteList, Note } from '@/components/NoteList';
import { Toolbar, Tool } from '@/components/Toolbar';

export default function HomeScreen() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: '첫 번째 노트',
      content: '안녕하세요! 이것은 첫 번째 노트입니다.',
      createdAt: new Date(),
      tags: ['첫번째', '테스트'],
    },
  ]);

  const [selectedTool, setSelectedTool] = useState<Tool>('pen');
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(2);

  const handleNotePress = (note: Note) => {
    // 노트 상세 화면으로 이동
    console.log('노트 선택:', note);
  };

  const handleNoteCreate = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '새 노트',
      content: '',
      createdAt: new Date(),
      tags: [],
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <View style={styles.container}>
      <NoteList
        notes={notes}
        onNotePress={handleNotePress}
        onNoteCreate={handleNoteCreate}
      />
      <Toolbar
        selectedTool={selectedTool}
        onToolSelect={setSelectedTool}
        penColor={penColor}
        penSize={penSize}
        onColorChange={setPenColor}
        onSizeChange={setPenSize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
