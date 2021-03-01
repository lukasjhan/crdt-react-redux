import io from 'socket.io-client';
import {Middleware, MiddlewareAPI, Dispatch} from 'redux';
import { TodoState, actionCreators, global_socket } from './modules/todo';

const socketMiddleware: Middleware = ({ getState }: MiddlewareAPI) => (
    next: Dispatch
) => action => {
    next(action);
    const state = getState() as TodoState;

    global_socket.on('update1', function(add: Set<string>, rem: Set<string>) {
        console.log(add, rem);
        next(actionCreators.update({add, rem}));
    });

}

export default socketMiddleware;