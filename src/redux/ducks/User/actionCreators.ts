import {LoadingState} from "../../../types/loadingState";
import {UserState} from "./Contracts";
import {Action} from "redux";
import {LoginForm} from "../../../Pages/Sign/components/LoginModal";

export enum UserActionTypes {
    SET_USER_DATA = "user/SET_USER_DATA",
    FETCH_USER = "user/FETCH_USER",
    LOADING_STATE = "user/LOADING_STATE",
}

export interface setUserDataInterface extends Action<UserActionTypes> {
    type: UserActionTypes.SET_USER_DATA,
    payload: UserState["data"],
}

export interface setUserLoadingStateInterface extends Action<UserActionTypes> {
    type: UserActionTypes.LOADING_STATE,
    payload: LoadingState,
}

export interface fetchUserDataInterface extends Action<UserActionTypes> {
    type: UserActionTypes.FETCH_USER,
    payload: LoginForm,
}

export const setUser = (payload: UserState["data"]): setUserDataInterface => ({
    type: UserActionTypes.SET_USER_DATA,
    payload,
});

export const fetchUser = (payload: LoginForm): fetchUserDataInterface => ({
    type: UserActionTypes.FETCH_USER,
    payload,
});

export const setUserLoadingState = (payload: LoadingState): setUserLoadingStateInterface => ({
    type: UserActionTypes.LOADING_STATE,
    payload,
});

export type UserActions = setUserDataInterface |
    fetchUserDataInterface |
    setUserLoadingStateInterface