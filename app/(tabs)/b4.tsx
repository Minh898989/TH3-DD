import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Todo {
  id: number;
  text: string;
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
    };

    setTodos([...todos, newTodo]);
    setInput(""); 
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập công việc..."
        placeholderTextColor="#888"
        value={input}
        onChangeText={setInput}
      />

      <Button title="Thêm việc" onPress={addTodo} />

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <View style={{ marginTop: 20 }}>
        {todos.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => removeTodo(item.id)}>
            <Text style={styles.todoItem}>• {item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    padding: 10,
    color: "#fff",
    backgroundColor: "#222",
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 5,
  },
  todoItem: {
    fontSize: 20,
    color: "#fff",
    paddingVertical: 8,
  },
});