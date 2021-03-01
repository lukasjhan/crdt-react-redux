import modules, { StoreState } from './modules'
import { createStore, Store } from "redux";

export default function configureStore():Store<StoreState> {
  const store = createStore(
    modules,
  );
  return store;
}