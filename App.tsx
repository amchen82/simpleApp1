import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Appbar, TextInput, Button, List, FAB, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebase';
import { signInWithGoogle, handleSignOut } from './services/auth';
import { onAuthStateChanged } from 'firebase/auth';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    loadTodos();
    return () => unsubscribe();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadTodos();
    setRefreshing(false);
  }, []);

  const saveTodos = async (updatedTodos: Todo[]) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodoItem];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Todo App" />
          {user ? (
            <>
              <Appbar.Action icon="account" />
              <Appbar.Action icon="logout" onPress={handleSignOut} />
            </>
          ) : (
            <Button
              mode="contained"
              onPress={signInWithGoogle}
              style={styles.loginButton}
            >
              Sign in
            </Button>
          )}
        </Appbar.Header>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Add a new todo"
            right={<TextInput.Icon icon="plus" onPress={addTodo} />}
            onSubmitEditing={addTodo}
          />
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.text}
              left={props => (
                <TouchableOpacity onPress={() => toggleTodo(item.id)}>
                  <IconButton
                    icon={item.completed ? "check-circle" : "circle-outline"}
                    size={24}
                    onPress={() => toggleTodo(item.id)}
                  />
                </TouchableOpacity>
              )}
              right={props => (
                <IconButton
                  icon="delete"
                  size={24}
                  onPress={() => deleteTodo(item.id)}
                />
              )}
              style={[
                styles.todoItem,
                item.completed && styles.completedTodo,
              ]}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />
          }
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  todoItem: {
    paddingHorizontal: 16,
  },
  completedTodo: {
    opacity: 0.5,
  },
  loginButton: {
    marginRight: 8,
  },
}); 