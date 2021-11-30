import {Tweet, LoadingState} from "../../Tweet/Contracts";
import {Action} from "redux";

export enum TweetActionTypes {
    SET_TWEET = "tweet/SET_TWEET",
    FETCH_TWEET = "tweet/FETCH_TWEET",
    SET_LOADING_STATE = "tweet/SET_LOADING_STATE",
    CLEAR_TWEET_DATA = "tweet/CLEAR_TWEET_DATA",
}

export interface ClearTweetDataActionInterface extends Action<TweetActionTypes>{
    type: TweetActionTypes.CLEAR_TWEET_DATA,
}

export interface SetTweetActionInterface extends Action<TweetActionTypes> {
    type: TweetActionTypes.SET_TWEET,
    payload: Tweet,
}

export interface FetchTweetActionInterface extends Action<TweetActionTypes> {
    type: TweetActionTypes.FETCH_TWEET,
    payload: string,
}

export interface SetTweetLoadingStateActionInterface extends Action<TweetActionTypes> {
    type: TweetActionTypes.SET_LOADING_STATE,
    payload: LoadingState,
}

export const clearTweetData = (): ClearTweetDataActionInterface => ({
    type: TweetActionTypes.CLEAR_TWEET_DATA,
});

export const fetchTweet = (payload: string): FetchTweetActionInterface => ({
    type: TweetActionTypes.FETCH_TWEET,
    payload,
});

export const setTweet = (payload: Tweet): SetTweetActionInterface => ({
    type: TweetActionTypes.SET_TWEET,
    payload,
});

export const setTweetLoadingState = (payload: LoadingState): SetTweetLoadingStateActionInterface => ({
    type: TweetActionTypes.SET_LOADING_STATE,
    payload,
});

export type TweetActions = SetTweetActionInterface | FetchTweetActionInterface | SetTweetLoadingStateActionInterface | ClearTweetDataActionInterface;