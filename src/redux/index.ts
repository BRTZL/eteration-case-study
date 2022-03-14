import {
  AnyAction,
  applyMiddleware,
  CombinedState,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import simpsonsSlice, { SimpsonsState } from './simpsons.slice';

const appReducers = combineReducers({
  simpsonsSlice,
});

const rootReducer = (
  state:
    | CombinedState<{
        simpsonsSlice: SimpsonsState;
      }>
    | undefined,
  action: AnyAction,
) => appReducers(state, action);

const logger = createLogger({
  collapsed: true,
  timestamp: true,
  level: 'info',
});

const middlewares = [thunk, logger];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares)),
);

export default store;
