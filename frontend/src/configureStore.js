import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import analyticsMiddleware from './common/analyticsMiddleware';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(history) {
  const reactRouterReduxMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    reactRouterReduxMiddleware,
    analyticsMiddleware,
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
