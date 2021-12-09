import {call, put, takeLatest} from "redux-saga/effects";
import {fetchUserDataInterface, setUser, setUserLoadingState, UserActionTypes} from "./actionCreators";
import {UserState} from "./Contracts";
import {AuthAPI} from "../../../Services/api/authAPI";
import {LoadingState} from "../../../types/loadingState";

export function* fetchUserRequest({payload: loginData}: fetchUserDataInterface) {
    try {
        yield put(setUserLoadingState(LoadingState.LOADING));
        const data:UserState['data'] = yield call(AuthAPI.login, loginData);
        if (data?.token != null) {
            window.localStorage.setItem('token', data.token);
        }
        yield put(setUser(data));
        yield put(setUserLoadingState(LoadingState.LOADED));
        yield put(setUserLoadingState(LoadingState.NEVER))
    } catch (e) {
        yield put(setUserLoadingState(LoadingState.ERROR));
        console.log(e)
    }
}

export function* userSaga() {
    yield takeLatest(UserActionTypes.FETCH_USER, fetchUserRequest)
}