import produce, {Draft} from "immer";
import {LoadingState, TweetState} from "./Contracts";
import {TweetsActions, TweetsActionTypes} from "./actionCreators";

const initialState:TweetState = {
    items: [],
    userItems: [],
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
            draft.items.unshift(action.payload);
            draft.userItems.unshift(action.payload);
            break;
        }
        case TweetsActionTypes.FETCH_ADD_TWEET: {
            break;
        }
        case TweetsActionTypes.FETCH_USER_TWEETS: {
            draft.loadingState = LoadingState.LOADING;
            break;
        }
        case TweetsActionTypes.SET_USER_TWEETS: {
            draft.userItems = action.payload;
            draft.loadingState = LoadingState.LOADED;
            break;
        }
        case TweetsActionTypes.DELETE_TWEET: {
            draft.items = draft.items.filter(item => item._id !== action.payload);
            draft.userItems = draft.userItems.filter(item => item._id !== action.payload);
            break;
        }
        case TweetsActionTypes.ADD_BOOKMARKS: {
            break;
        }
        default:
            break;
    }
}, initialState);