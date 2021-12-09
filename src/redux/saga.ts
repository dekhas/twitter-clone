import {all} from "redux-saga/effects"
import {tweetsSaga} from "./ducks/Tweet/sagas";
import {tweetSaga} from "./ducks/tweetPage/sagas";
import {userSaga} from "./ducks/User/sagas";

export default function* rootSaga() {
    yield all([tweetsSaga(), tweetSaga(), userSaga(),])
}