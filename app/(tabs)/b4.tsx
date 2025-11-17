import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  const addTodo = () => {
    if (input.trim() === "") {
      setError("Vui lòng nhập nội dung!");
      return;
    }

    setError("");

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInput(""); 
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const activeTodos = todos.filter((t) => !t.completed).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📝 Todo List</Text>
        <Text style={styles.subtitle}>Quản lý công việc của bạn</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc mới..."
          placeholderTextColor="#94a3b8"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTodo}
        />

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={addTodo}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Thêm</Text>
        </TouchableOpacity>
      </View>

      {error !== "" && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}> {error}</Text>
        </View>
      )}

      {/* Stats */}
      {todos.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {activeTodos} công việc chưa hoàn thành • {todos.length} tổng cộng
          </Text>
        </View>
      )}

      {/* Todo List */}
      <ScrollView 
        style={styles.todoList}
        showsVerticalScrollIndicator={false}
      >
        {todos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyText}>Chưa có công việc nào</Text>
            <Text style={styles.emptySubtext}>Thêm công việc đầu tiên của bạn!</Text>
          </View>
        ) : (
          todos.map((item) => (
            <View key={item.id} style={styles.todoCard}>
              <TouchableOpacity 
                style={styles.todoContent}
                onPress={() => toggleTodo(item.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted
                ]}>
                  {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={[
                  styles.todoText,
                  item.completed && styles.todoTextCompleted
                ]}>
                  {item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => removeTodo(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#334155',
    paddingVertical: 14,
    paddingHorizontal: 18,
    color: '#fff',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorContainer: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statsText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  todoList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '400',
  },
  todoCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#475569',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  checkboxCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    flex: 1,
  },
  todoTextCompleted: {
    color: '#64748b',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 20,
  },
});