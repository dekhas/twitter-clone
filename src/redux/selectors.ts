import {TweetState} from "./ducks/Tweet/Contracts";
import {RootState} from "./store";
import {TweetData} from "./ducks/tweetPage/Contracts/state";
import {UserState} from "./ducks/User/Contracts";
import {DialogsInterface} from "./ducks/Dialogs/Contracts";

const getTweetState = (state: RootState): TweetState => state.tweets;
const getTweet = (state: RootState): TweetData => state.tweet;
const getUser = (state: RootState): UserState => state.user;
const getDialogs = (state: RootState): DialogsInterface => state.dialogs;

export const selectTweets = (state: RootState) => getTweetState(state).items;

export const selectLoadingState = (state: RootState) => getTweetState(state).loadingState;

export const selectTweetData = (state: RootState) => getTweet(state).data;

export const selectUserTweetsData = (state: RootState) => getTweetState(state).userItems;

export const selectTweetLoadingState = (state: RootState) => getTweet(state).loadingState;

export const selectUserLoadingState = (state: RootState) => getUser(state).loadingState;

export const selectUserId = (state: RootState) => getUser(state).data?.username;

export const selectUserData = (state: RootState): UserState['data'] => getUser(state).data;

export const selectIsAuth = (state: RootState) => !!getUser(state).data;

export const selectDialogs = (state: RootState) => getDialogs(state).data;