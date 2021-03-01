import { combineReducers } from 'redux';
import { TodoState, todoReducer as todo } from './todo'

export interface StoreState {
    todo: TodoState;
}

export default combineReducers<StoreState>({
    todo
});