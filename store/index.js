import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { recordsReducer } from './reducers/records';

const rootReducer = combineReducers({
    records: recordsReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));