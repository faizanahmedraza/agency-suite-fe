import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "@store/rootReducer";
import rootSaga from "@store/rootSaga";
import logger from "redux-logger";
import { 
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

export {
  store
};

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
