import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import toDoReducer from "./toDoReducer";
import rootSaga from "./sagas";

const rootReducer = combineReducers({
  toDo: toDoReducer,
});

const sagaMiddleware = createSagaMiddleware();

type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
