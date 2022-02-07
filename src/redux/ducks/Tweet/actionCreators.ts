import {Action} from "redux";
import {LoadingState, Tweet, TweetState} from "./Contracts";

export enum TweetsActionTypes {
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    LOADING_STATE = "tweets/LOADING_STATE",
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    ADD_TWEET = "tweets/ADD_TWEET",
    SET_USER_TWEETS = "tweets/SET_USER_TWEETS",
    FETCH_USER_TWEETS = "tweets/FETCH_USER_TWEETS",
    ADD_BOOKMARKS = 'tweets/ADD_BOOKMARKS',
    DELETE_TWEET = 'tweets/DELETE_TWEET',
}

export interface deleteTweetInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.DELETE_TWEET,
    payload: string,
}

export interface addBookmarkInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.ADD_BOOKMARKS,
    tweetID: string,
    tweet: Tweet,
}

export interface FetchUserTweetsActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.FETCH_USER_TWEETS,
    payload: string,
}

export interface SetUserTweetsActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.SET_USER_TWEETS,
    payload: TweetState["userItems"],
}

export interface AddTweetActionCreator extends Action<TweetsActionTypes>{
    type: TweetsActionTypes.ADD_TWEET,
    payload: Tweet,
}

export interface FetchAddTweetActionCreator extends Action<TweetsActionTypes>{
    type: TweetsActionTypes.FETCH_ADD_TWEET,
    payload: string,
}

export interface SetTweetsActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.SET_TWEETS,
    payload: TweetState['items'],
}

export interface FetchTweetsActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.FETCH_TWEETS,
}

export interface SetTweetsLoadingStateActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.LOADING_STATE,
    payload: LoadingState,
}

export const deleteTweet = (payload: string): deleteTweetInterface => ({
    type: TweetsActionTypes.DELETE_TWEET,
    payload,
});

export const fetchUserTweets = (payload: string): FetchUserTweetsActionInterface => ({
    type: TweetsActionTypes.FETCH_USER_TWEETS,
    payload,
});

export const setUserTweets = (payload: TweetState["userItems"]): SetUserTweetsActionInterface => ({
    type: TweetsActionTypes.SET_USER_TWEETS,
    payload,
});

export const addTweet = (payload: Tweet): AddTweetActionCreator => ({
    type: TweetsActionTypes.ADD_TWEET,
    payload,
});

export const fetchAddTweet = (payload: string): FetchAddTweetActionCreator => ({
    type: TweetsActionTypes.FETCH_ADD_TWEET,
    payload,
});

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionTypes.FETCH_TWEETS,
});

export const setTweets = (payload: TweetState['items']): SetTweetsActionInterface => ({
    type: TweetsActionTypes.SET_TWEETS,
    payload,
});

export const setTweetsLoadingState = (payload: LoadingState): SetTweetsLoadingStateActionInterface => ({
    type: TweetsActionTypes.LOADING_STATE,
    payload,
});

export const addBookmark = (tweet: Tweet, tweetID: string): addBookmarkInterface => ({
    type: TweetsActionTypes.ADD_BOOKMARKS,
    tweet,
    tweetID,
});

export type TweetsActions = SetTweetsActionInterface |
    FetchTweetsActionInterface |
    SetTweetsLoadingStateActionInterface |
    FetchAddTweetActionCreator |
    AddTweetActionCreator |
    SetUserTweetsActionInterface |
    FetchUserTweetsActionInterface |
    addBookmarkInterface |
    deleteTweetInterface;