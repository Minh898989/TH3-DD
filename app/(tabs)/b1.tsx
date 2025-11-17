// B1.tsx
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function B1() {
  const [text, setText] = useState<string>('');

  return (
    <ThemedView style={styles.container}>
      {/* Input */}
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập nội dung..."
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
          multiline
          textAlignVertical="top"
        />
      </ThemedView>

      {/* Output */}
      <ThemedView style={styles.outputContainer}>
        <ThemedText style={styles.outputText}>
          {text.length > 0 ? text : 'Chưa có nội dung'}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 24,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginTop: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    padding: 12,
    minHeight: 80,
  },
  input: {
    fontSize: 16,
    minHeight: 60,
  },
  outputContainer: {
    backgroundColor: '#e8e0e0ff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#1a0f0f1d',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outputText: {
    fontSize: 18,
    color: 'rgba(201, 45, 45, 1)',
    fontWeight: '500',
    textAlign: 'center',
  },
});
