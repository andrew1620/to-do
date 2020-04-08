import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";

import toDoReducer from "./toDoReducer";
import rootSaga from "./sagas";

const rootReducer = combineReducers({
  toDo: toDoReducer,
  form: formReducer,
});

const sagaMiddleware = createSagaMiddleware();

type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
