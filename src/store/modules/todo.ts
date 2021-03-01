import io from 'socket.io-client';
import dispatch from 'redux';

export interface CRDT {
  add: Set<string>;
  rem: Set<string>;
}

export interface TodoState {
    todoItems: string[];
    input: string;
    socket: SocketIOClient.Socket;
    crdt: CRDT;
}

export const CREATE = "todo/CREATE";
export const REMOVE = "todo/REMOVE";
export const CHANGE_INPUT = "todo/CHANGE_INPUT";
export const UPDATE = "todo/UPDATE";
  
interface CreateAction {
    type: typeof CREATE;
    payload: string;
}

interface RemoveAction {
    type: typeof REMOVE;
    payload: string;
}

interface ChangeInputAction {
    type: typeof CHANGE_INPUT;
    meta: {
      input: string;
    };
}

interface UpdateAction {
  type: typeof UPDATE;
  payload: CRDT;
}

export type TodoActionTypes =
    | CreateAction
    | RemoveAction
    | ChangeInputAction
    | UpdateAction;

function create(text: string) {
    return {
      type: CREATE,
      payload: text,
    };
}

function remove(text: string) {
    return {
      type: REMOVE,
      payload: text,
    };
}

function changeInput(input: string) {
    return {
      type: CHANGE_INPUT,
      meta: {
        input
      }
    };
  }

function update(crdt: CRDT) {
  console.log('update', crdt);
  return {
    type: UPDATE,
    payload: crdt,
  };
}
  
  export const actionCreators = {
    create,
    remove,
    changeInput,
    update,
};

// reducers

export const global_socket = io.connect('http://localhost:4000', {
  path: '/socket.io',
  transports: ['websocket']
});

const initialState: TodoState = {
    todoItems: [],
    input: "",
    socket: global_socket,
    crdt: {
      add: new Set<string>(),
      rem: new Set<string>(),
    }
};

export const merge = (crdt: CRDT): string[] => {
  const differenceSet = new Set<string>(
    [...crdt.add].filter(v => !crdt.rem.has(v))
  );
  return [...differenceSet];
}

export function todoReducer(
    state = initialState,
    action: TodoActionTypes
): TodoState {
  const {socket, crdt} = state;
  console.log('reducer', action.type);
    switch (action.type) {
      case CREATE: {
        crdt.add.add(action.payload);
        socket.emit('update', [...crdt.add], [...crdt.rem]);
        const items = merge(crdt);
        return {
          ...state,
          input: "",
          todoItems: items,
          crdt: crdt,
        };
      }
      case REMOVE: {
        crdt.rem.add(action.payload);
        socket.emit('update', [...crdt.add], [...crdt.rem]);
        const items = merge(crdt);
        return {
          ...state,
          todoItems: items,
          crdt: crdt,
        };
      }
      case CHANGE_INPUT:
        return {
          ...state,
          input: action.meta.input
        };
      case UPDATE:
        console.log("test");
        const {add:serverAdd, rem:serverRem} = action.payload;
        const newAdd = new Set<string>([...crdt.add, ...serverAdd]);
        const newRem = new Set<string>([...crdt.rem, ...serverRem]);
        const newCRDT = {add:newAdd, rem:newRem};
        const items = merge(newCRDT);
        return {
          ...state,
          todoItems: items,
          crdt: newCRDT,
        };
      default:
        return state;
    }
}