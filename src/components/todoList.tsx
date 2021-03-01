import React from "react";
import TodoItem from "./todoItem";

interface Props {
  input: string;
  todoItems: string[];
  onCreate(): void;
  onRemove(text: string): void;
  onChange(e: any): void;
}

const TodoList: React.SFC<Props> = ({
  input,
  todoItems,
  onCreate,
  onRemove,
  onChange
}) => {
  const todoItemList = todoItems.map((todo, index) => 
    <TodoItem
      key={index}
      onRemove={() => onRemove(todo)}
      text={todo}
    />);

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