import {LoadingState} from "../Tweet/Contracts";
import produce, {Draft} from "immer";
import {TweetActions, TweetActionTypes} from "./Contracts/actionCreators";
import {TweetData} from "./Contracts/state";

const initialState: TweetData = {
    data: null,
    loadingState: LoadingState.NEVER,
};

export const tweetReducer = produce((draft: Draft<TweetData>, actions: TweetActions) => {
    switch (actions.type) {
        case TweetActionTypes.FETCH_TWEET: {
            draft.loadingState = LoadingState.LOADING;
            break;
        }
        case TweetActionTypes.SET_LOADING_STATE: {
            draft.loadingState = actions.payload;
            break;
        }
        case TweetActionTypes.SET_TWEET: {
            draft.data = actions.payload;
            draft.loadingState = LoadingState.LOADED;
            break;
        }
        case TweetActionTypes.CLEAR_TWEET_DATA: {
            draft.data = null;
            break;
        }
        default:
            break;
    }
}, initialState);