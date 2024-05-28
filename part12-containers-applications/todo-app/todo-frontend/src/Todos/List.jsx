import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, completeTodo }) => (
  <>
    {todos.map((todo) => (
      <>
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
        <hr />
      </>
    ))}
  </>
);

export default TodoList;