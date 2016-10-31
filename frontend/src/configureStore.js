import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(history) {
  // const reactRouterReduxMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    // reactRouterReduxMiddleware,
  ];

  const store = createStore(
      rootReducer,
      {},
      compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
      )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
