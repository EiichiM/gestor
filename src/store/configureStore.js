import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
import rootReducer from 'src/reducers';

// const loggerMiddleware = createLogger();

const configureStore = (preloadedState = {}) => {
  const middlewares = [thunkMiddleware]; // loggerMiddleware

  //const composeWithDevTools = 
    //typeof window === 'object' && 
      //typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== undefined
      //? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      //})
      //: compose;

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};

export default configureStore;
