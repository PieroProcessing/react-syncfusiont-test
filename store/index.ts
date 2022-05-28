import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga, rootReducer } from 'saga-slice';

// Bring in all of your saga slices together in whatever file
// you're going to declare your redux store
import { peopleSlice } from './entity';

// And add all of your saga slices into an array
const modules = [peopleSlice];

const sagaMiddleware = createSagaMiddleware();

// Use the `rootReducer` helper function to create a
// main reducer out of the array of saga-slice modules.
// You can optionally pass other reducers to this root
// reducer for cases where you have something outside the
// scope of saga-slice
// const appReducer = rootReducer(modules, {
//   myExtraReducer: (state, action) => {
//     /* do stuff */
//     return null;
//   },
// });
const reducers = combineReducers({
  people: peopleSlice.reducer,
});
// Typicaly redux middleware
const middleware = applyMiddleware(
  ...[
    sagaMiddleware,
    /* redux dev tools, etc*/
  ]
);
export type RootState = ReturnType<typeof reducers>;
const composeEnhancers =
  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware /*other middleware*/)
  /* other store enhancers if any */
);
const store = createStore(reducers, enhancer);

// Use the `rootSaga` helper function to create a generator function
// which will instantiate all sagas using the `*all()` effect based
// on the saga-slice modules array
sagaMiddleware.run(rootSaga(modules));

export default store;
