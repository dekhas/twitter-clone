import {TweetState} from "./ducks/Tweet/Contracts";
import {RootState} from "./store";
import {TweetData} from "./ducks/tweetPage/Contracts/state";

const getTweetState = (state: RootState): TweetState => state.tweets;
const getTweet = (state: RootState): TweetData => state.tweet;

export const selectTweets = (state: RootState) => getTweetState(state).items;

export const selectLoadingState = (state: RootState) => getTweetState(state).loadingState;

export const selectTweetData = (state: RootState) => getTweet(state).data;

export const selectTweetLoadingState = (state: RootState) => getTweet(state).loadingState;