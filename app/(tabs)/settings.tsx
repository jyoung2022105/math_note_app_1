import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [penOnly, setPenOnly] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>
      <View style={styles.optionRow}>
        <Text style={styles.optionLabel}>펜으로만 그리기</Text>
        <Switch
          value={penOnly}
          onValueChange={setPenOnly}
        />
      </View>
      <Text style={styles.optionDesc}>
        꺼짐: 손가락으로도 필기 가능{`\n`}켜짐: 펜(스타일러스)만 필기 가능
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  optionLabel: { flex: 1, fontSize: 18 },
  optionDesc: { color: '#888', fontSize: 14, marginTop: 8 },
}); 