import {call, put, takeLatest} from "redux-saga/effects";
import {
    loginUserDataInterface,
    registerUserDataInterface,
    setUser,
    setUserLoadingState,
    UserActionTypes
} from "./actionCreators";
import {UserInterface, UserState} from "./Contracts";
import {AuthAPI} from "../../../Services/api/authAPI";
import {LoadingState} from "../../../types/loadingState";
import setToken from "../../../utils/setToken";

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
        yield put(setUserLoadingState(LoadingState.NEVER))
    } catch (e) {
        yield put(setUserLoadingState(LoadingState.ERROR))
    }
}

export function* authMeRequest() {
    try {
        const data:UserInterface = yield call(AuthAPI.authMe);
        yield put(setUser(data))
    } catch (e) {}
}

export function* userSaga() {
    yield takeLatest(UserActionTypes.LOGIN_USER, loginUserRequest);
    yield takeLatest(UserActionTypes.AUTH_ME, authMeRequest);
    yield takeLatest(UserActionTypes.REGISTER_USER, registerUserRequest)
}