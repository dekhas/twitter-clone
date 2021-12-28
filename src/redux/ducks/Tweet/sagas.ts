import {
    addTweet,
    FetchUserTweetsActionInterface,
    setTweets,
    setTweetsLoadingState, setUserTweets,
    TweetsActionTypes,
} from "./actionCreators";
import {call, put, takeLatest} from "redux-saga/effects";
import {TweetsAPI} from "../../../Services/api/tweetsAPI";
import {LoadingState, Tweet, TweetState} from "./Contracts";
import {FetchTweetActionInterface} from "../tweetPage/Contracts/actionCreators";

export function* fetchTweetsRequest() {
    try {
        const items:TweetState["items"] = yield call(TweetsAPI.fetchTweets);
        yield put(setTweets(items));
    } catch (e) {
        console.log(e);
        yield put(setTweetsLoadingState(LoadingState.ERROR));
    }
}

export function* addTweetRequest({payload: text}: FetchTweetActionInterface) {
    try {
        const tweet: Tweet = yield call(TweetsAPI.addTweet, text);
        yield put(addTweet(tweet));
    } catch (e) {
        console.log(e);
    }
}

export function* fetchUserTweetsRequests({payload: userID}: FetchUserTweetsActionInterface) {
    try {
        const userTweets: TweetState["userItems"] = yield call(TweetsAPI.fetchUserTweets, userID);
        yield put(setUserTweets(userTweets.reverse()))
    } catch (e) {
        console.log(e);
        yield put(setTweetsLoadingState(LoadingState.ERROR))
    }
}

export function* tweetsSaga() {
    yield takeLatest(TweetsActionTypes.FETCH_TWEETS, fetchTweetsRequest);
    yield takeLatest(TweetsActionTypes.FETCH_ADD_TWEET, addTweetRequest);
    yield takeLatest(TweetsActionTypes.FETCH_USER_TWEETS, fetchUserTweetsRequests);
}