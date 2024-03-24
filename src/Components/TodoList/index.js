import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = async () => {
    if (inputValue.trim() !== '') {
      try {
        await axios.post('/api/todos', { todo: inputValue });
        fetchTodos();
        setInputValue('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleRemoveTodo = async (index) => {
    try {
      await axios.delete(`/api/todos/${index}`);
      fetchTodos();
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a todo..."
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
