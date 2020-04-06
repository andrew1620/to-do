import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import toDo from "./toDo";

const rootReducer = combineReducers({
  toDo,
});

const sagaMiddleware = createSagaMiddleware();

type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export default store;
