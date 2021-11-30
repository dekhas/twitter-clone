import produce, {Draft} from "immer";
import {LoadingState, TweetState} from "./Contracts";
import {TweetsActionTypes, TweetsActions} from "./actionCreators";

const initialState:TweetState = {
    items: [],
    loadingState: LoadingState.NEVER,
};

export const tweetsReducer = produce((draft: Draft<TweetState>, action: TweetsActions) => {
    switch (action.type) {
        case TweetsActionTypes.SET_TWEETS: {
            draft.items = action.payload;
            draft.loadingState = LoadingState.LOADED;
            break;
        }
        case TweetsActionTypes.FETCH_TWEETS: {
            draft.items = [];
            draft.loadingState = LoadingState.LOADING;
            break;
        }
        case TweetsActionTypes.LOADING_STATE: {
            draft.loadingState = action.payload;
            break;
        }
        case TweetsActionTypes.ADD_TWEET: {
            draft.items.push(action.payload);
            break;
        }
        case TweetsActionTypes.FETCH_ADD_TWEET: {
            break;
        }
        default:
            break;
    }
}, initialState);