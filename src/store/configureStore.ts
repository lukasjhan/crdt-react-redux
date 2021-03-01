import modules, { StoreState } from './modules'
import { createStore, Store, applyMiddleware } from "redux";
import socketMiddleware from './middleware';

export default function configureStore():Store<StoreState> {
  const store = createStore(
    modules,
    applyMiddleware(socketMiddleware),
  );
  return store;
}