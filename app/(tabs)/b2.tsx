// ClickCounter.tsx
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function B2() {
  const [count, setCount] = useState<number>(0);

  return (
    <ThemedView style={styles.container}>
      {/* Output */}
      <ThemedView style={styles.outputContainer}>
        <ThemedText style={styles.outputText}>
          Bạn đã nhấn: {count} {count === 1 ? 'lần' : 'lần'}
        </ThemedText>
      </ThemedView>

      {/* Nút Nhấn tôi */}
      <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
        <ThemedText style={styles.buttonText}>Nhấn tôi</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    minWidth: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outputText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
});
