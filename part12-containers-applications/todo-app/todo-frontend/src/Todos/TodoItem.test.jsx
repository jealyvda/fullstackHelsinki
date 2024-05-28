import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { jest, describe, it, expect } from '@jest/globals';
import TodoItem from './TodoItem';

const todo = {
  id: 1,
  text: 'Buy groceries',
  done: false,
};

const deleteTodoMock = jest.fn();
const completeTodoMock = jest.fn();

describe('TodoItem', () => {
  it('renders the todo text', () => {
    const { getByText } = render(<TodoItem todo={todo} deleteTodo={deleteTodoMock} completeTodo={completeTodoMock} />);
    expect(getByText('Buy groceries')).toBeInTheDocument();
  });

  it('calls deleteTodo when the delete button is clicked', () => {
    const { getByText } = render(<TodoItem todo={todo} deleteTodo={deleteTodoMock} completeTodo={completeTodoMock} />);
    fireEvent.click(getByText('Delete'));
    expect(deleteTodoMock).toHaveBeenCalledWith(todo);
  });

  it('calls completeTodo when the complete button is clicked', () => {
    const { getByText } = render(<TodoItem todo={todo} deleteTodo={deleteTodoMock} completeTodo={completeTodoMock} />);
    fireEvent.click(getByText('Set as done'));
    expect(completeTodoMock).toHaveBeenCalledWith(todo);
  });
});