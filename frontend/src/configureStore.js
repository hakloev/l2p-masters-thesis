import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import analyticsMiddleware from './common/analyticsMiddleware';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore(history) {
  // const reactRouterReduxMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    analyticsMiddleware,
    // reactRouterReduxMiddleware,
  ];

  const store = createStore(
      rootReducer,
      {},
      compose(
        applyMiddleware(...middleware),
        (process.env.NODE_ENV === 'development' && window.devToolsExtension) ? window.devToolsExtension() : f => f,
      )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
