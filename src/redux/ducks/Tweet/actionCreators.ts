import {Action} from "redux";
import {LoadingState, Tweet, TweetState} from "./Contracts";

export enum TweetsActionTypes {
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    LOADING_STATE = "tweets/LOADING_STATE",
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    ADD_TWEET = "tweets/ADD_TWEET",
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

export type TweetsActions = SetTweetsActionInterface |
    FetchTweetsActionInterface |
    SetTweetsLoadingStateActionInterface |
    FetchAddTweetActionCreator |
    AddTweetActionCreator;