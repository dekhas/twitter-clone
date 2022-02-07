import {call, put, takeLatest} from "redux-saga/effects";
import {
    deleteBookmarkInterface,
    fetchBookmarks,
    loginUserDataInterface,
    registerUserDataInterface, setBookmarks,
    setUser,
    setUserLoadingState,
    UserActionTypes
} from "./actionCreators";
import {UserInterface, UserState} from "./Contracts";
import {AuthAPI} from "../../../Services/api/authAPI";
import {LoadingState} from "../../../types/loadingState";
import setToken from "../../../utils/setToken";
import {Tweet} from "../Tweet/Contracts";
import UserAPI from "../../../Services/api/userAPI";

export function* loginUserRequest({payload: loginData}: loginUserDataInterface) {
    try {
        const data:UserState['data'] = yield call(AuthAPI.login, loginData);
        setToken(data?.token);
        yield put(setUser(data));
        yield put(setUserLoadingState(LoadingState.LOADED));
        yield put(setUserLoadingState(LoadingState.NEVER))
    } catch (e) {
        yield put(setUserLoadingState(LoadingState.ERROR));
        console.log(e)
    }
}

export function* registerUserRequest({payload: registerData}: registerUserDataInterface) {
    try {
        const data:UserState["data"] = yield call(AuthAPI.register, registerData);
        setToken(data?.token);
        yield put(setUser(data));
        yield put(setUserLoadingState(LoadingState.LOADED));
        yield put(setUserLoadingState(LoadingState.NEVER));
    } catch (e) {
        yield put(setUserLoadingState(LoadingState.ERROR))
    }
}

export function* fetchBookmarksRequest() {
    try {
        const data: Tweet[] = yield call(UserAPI.getBookmarks);
        yield put(setBookmarks(data))
    } catch (e) {}
}

export function* authMeRequest() {
    try {
        const data:UserInterface = yield call(AuthAPI.authMe);
        yield put(setUser(data));
        yield put(fetchBookmarks());
    } catch (e) {}
}

export function* deleteBookmarkRequest({payload: tweetID}: deleteBookmarkInterface) {
    try {
        yield call(UserAPI.deleteBookmark, tweetID)
    } catch (e) {
        console.log(e)
    }
}

export function* userSaga() {
    yield takeLatest(UserActionTypes.LOGIN_USER, loginUserRequest);
    yield takeLatest(UserActionTypes.AUTH_ME, authMeRequest);
    yield takeLatest(UserActionTypes.REGISTER_USER, registerUserRequest);
    yield takeLatest(UserActionTypes.FETCH_BOOKMARKS, fetchBookmarksRequest);
    yield takeLatest(UserActionTypes.DELETE_BOOKMARK, deleteBookmarkRequest);
}