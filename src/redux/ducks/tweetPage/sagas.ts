import {LoadingState, Tweet} from "../Tweet/Contracts";
import {call, put, takeLatest} from "redux-saga/effects"
import {TweetsAPI} from "../../../Services/api/tweetsAPI";
import {FetchTweetActionInterface, setTweet, setTweetLoadingState, TweetActionTypes} from "./Contracts/actionCreators";

export function* fetchTweetRequest({payload: tweetId}: FetchTweetActionInterface) {
    try {
        const data:Tweet = yield call(TweetsAPI.fetchTweetData, tweetId);
        yield put(setTweet(data))
    } catch (e) {
        console.log(e);
        yield put(setTweetLoadingState(LoadingState.ERROR))
    }
}

export function* tweetSaga() {
    yield takeLatest(TweetActionTypes.FETCH_TWEET, fetchTweetRequest)
}