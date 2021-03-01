import React from 'react';
import TodoList from '../components/todoList';
import { connect } from 'react-redux';
import { StoreState } from '../store/modules';
import {
    TodoItemDataParams,
    actionCreators as todosActions,
} from '../store/modules/todo';
import {bindActionCreators} from 'redux';

interface Props {
    todoItems: TodoItemDataParams[];
    input: string;
    TodosActions: typeof todosActions;
}

class TodoListContainer extends React.Component<Props> {
    onCreate = (): void => {
        const { TodosActions, input } = this.props;
        if (input.length !== 0)
            TodosActions.create(input);
    }
    onRemove = (id: number): void => {
        const { TodosActions } = this.props;
        TodosActions.remove(id);
    }
    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { value } = e.currentTarget;
        const { TodosActions } = this.props;
        TodosActions.changeInput(value);
    }

    render() {
        const { input, todoItems } = this.props;
        const { onCreate, onChange, onRemove } = this;
        return (
            <TodoList
                input={input}
                todoItems={todoItems}
                onChange={onChange}
                onCreate={onCreate}
                onRemove={onRemove}
            />
        );
    }
}

export default connect(
    ({todo}:StoreState ) => ({
        input: todo.input,
        todoItems: todo.todoItems
    }),
    (dispatch) => ({
        TodosActions: bindActionCreators(todosActions, dispatch),
    })
)(TodoListContainer);