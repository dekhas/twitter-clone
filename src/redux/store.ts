import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {tweetsReducer} from "./ducks/Tweet/reducer";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./saga";
import {TweetState} from "./ducks/Tweet/Contracts";
import {TweetData} from "./ducks/tweetPage/Contracts/state";
import {tweetReducer} from "./ducks/tweetPage/reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetReducer,
});

export interface RootState {
    tweets: TweetState,
    tweet: TweetData,
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;