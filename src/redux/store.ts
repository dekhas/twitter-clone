import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {tweetsReducer} from "./ducks/Tweet/reducer";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./saga";
import {TweetState} from "./ducks/Tweet/Contracts";
import {TweetData} from "./ducks/tweetPage/Contracts/state";
import {UserState} from "./ducks/User/Contracts";
import {tweetReducer} from "./ducks/tweetPage/reducer";
import {userReducer} from "./ducks/User/reducer";
import {DialogsInterface} from "./ducks/Dialogs/Contracts";
import {dialogsReducer} from "./ducks/Dialogs/reducer";

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
    user: userReducer,
    dialogs: dialogsReducer,
});

export interface RootState {
    tweets: TweetState,
    tweet: TweetData,
    user: UserState,
    dialogs: DialogsInterface,
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;