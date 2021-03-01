import React from "react";
import TodoItem from "./todoItem";
import { TodoItemDataParams } from "../store/modules/todo";

interface Props {
  input: string;
  todoItems: TodoItemDataParams[];
  onCreate(): void;
  onRemove(id: number): void;
  onChange(e: any): void;
}

const TodoList: React.SFC<Props> = ({
  input,
  todoItems,
  onCreate,
  onRemove,
  onChange
}) => {
  const todoItemList = todoItems.map(todo => 
      todo ? (
    <TodoItem
      key={todo.id}
      done={todo.done}
      onRemove={() => onRemove(todo.id)}
      text={todo.text}
    />
  ) : null);

  return (
    <div>
      <h1>What to do?</h1>
      <form onSubmit={(e: React.FormEvent<HTMLElement>) => {
          e.preventDefault();
          onCreate();
      }}>
        <input onChange={onChange} value={input} />
        <button type="submit">Submit</button>
      </form>
      <ul>{todoItemList}</ul>
    </div>
  );
};

export default TodoList;