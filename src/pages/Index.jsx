import React, { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, Flex, Heading } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editingText } : task)));
    setEditingTask(null);
    setEditingText('');
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Todo App</Heading>
      <Flex mb={4}>
        <Input
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          mr={2}
        />
        <Button onClick={addTask}>Add Task</Button>
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id}>
            {editingTask === task.id ? (
              <Flex>
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  mr={2}
                />
                <Button onClick={() => saveTask(task.id)}>Save</Button>
              </Flex>
            ) : (
              <Flex justify="space-between" align="center">
                <Box>{task.text}</Box>
                <Box>
                  <IconButton
                    icon={<FaEdit />}
                    onClick={() => startEditing(task)}
                    mr={2}
                  />
                  <IconButton
                    icon={<FaTrash />}
                    onClick={() => deleteTask(task.id)}
                  />
                </Box>
              </Flex>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;