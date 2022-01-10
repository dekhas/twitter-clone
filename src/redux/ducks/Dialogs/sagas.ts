import {DialogsActionTypes, setDialogs, setDialogsLoadingState} from "./actionCreators";
import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingState} from "../../../types/loadingState";
import {DialogsInterface} from "./Contracts";
import UserAPI from "../../../Services/api/userAPI";

export function* fetchDialogsRequests() {
    try {
        yield put(setDialogsLoadingState(LoadingState.LOADING));
        const data: DialogsInterface["data"] = yield call(UserAPI.getConversations);
        yield put(setDialogs(data));
        yield put(setDialogsLoadingState(LoadingState.LOADED))
    } catch (e) {
        console.log(e);
        yield put(setDialogsLoadingState(LoadingState.ERROR))
    }
}

export function* dialogsSaga() {
    yield takeLatest(DialogsActionTypes.FETCH_DIALOGS, fetchDialogsRequests)
}