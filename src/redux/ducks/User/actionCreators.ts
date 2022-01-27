import {LoadingState} from "../../../types/loadingState";
import {UserState} from "./Contracts";
import {Action} from "redux";
import {LoginForm} from "../../../Pages/Sign/components/LoginModal";
import {RegisterForm} from "../../../Pages/Sign/components/RegisterModal";
import {Tweet} from "../Tweet/Contracts";

export enum UserActionTypes {
    SET_USER_DATA = "user/SET_USER_DATA",
    LOGIN_USER = "user/LOGIN_USER",
    REGISTER_USER = 'user/REGISTER_USER',
    LOADING_STATE = "user/LOADING_STATE",
    AUTH_ME = 'user/AUTH_ME',
    FETCH_USER = 'user/FETCH_USER',
    FETCH_BOOKMARKS = 'user/FETCH_BOOKMARKS',
    SET_BOOKMARKS = 'user/SET_BOOKMARKS',
    //ADD_BOOKMARKS = 'user/ADD_BOOKMARKS',
}

export interface fetchBookmarksInterface extends Action<UserActionTypes> {
    type: UserActionTypes.FETCH_BOOKMARKS,
}

export interface setBookmarksInterface extends Action<UserActionTypes>{
    type: UserActionTypes.SET_BOOKMARKS,
    payload: Tweet[],
}

export interface fetchUserInterface extends Action<UserActionTypes>  {
    type: UserActionTypes.FETCH_USER,
}

export interface registerUserDataInterface extends Action<UserActionTypes> {
    type: UserActionTypes.REGISTER_USER,
    payload: RegisterForm,
}

export interface setUserDataInterface extends Action<UserActionTypes> {
    type: UserActionTypes.SET_USER_DATA,
    payload: UserState["data"],
}

export interface setUserLoadingStateInterface extends Action<UserActionTypes> {
    type: UserActionTypes.LOADING_STATE,
    payload: LoadingState,
}

export interface loginUserDataInterface extends Action<UserActionTypes> {
    type: UserActionTypes.LOGIN_USER,
    payload: LoginForm,
}

export interface authMeInterface extends Action<UserActionTypes>  {
    type: UserActionTypes.AUTH_ME,
}

export const fetchBookmarks = (): fetchBookmarksInterface => ({
    type: UserActionTypes.FETCH_BOOKMARKS,
});

export const setBookmarks = (payload: Tweet[]): setBookmarksInterface => ({
    type: UserActionTypes.SET_BOOKMARKS,
    payload,
});

export const registerUser = (payload: RegisterForm): registerUserDataInterface => ({
    type: UserActionTypes.REGISTER_USER,
    payload,
});

export const authMe = (): authMeInterface => ({
    type: UserActionTypes.AUTH_ME,
});

export const setUser = (payload: UserState["data"]): setUserDataInterface => ({
    type: UserActionTypes.SET_USER_DATA,
    payload,
});

export const loginUser = (payload: LoginForm): loginUserDataInterface => ({
    type: UserActionTypes.LOGIN_USER,
    payload,
});

export const setUserLoadingState = (payload: LoadingState): setUserLoadingStateInterface => ({
    type: UserActionTypes.LOADING_STATE,
    payload,
});

export const fetchUser = (): authMeInterface => ({
    type: UserActionTypes.AUTH_ME,
});

export type UserActions = setUserDataInterface |
    registerUserDataInterface |
    loginUserDataInterface |
    setUserLoadingStateInterface |
    authMeInterface |
    fetchUserInterface |
    fetchBookmarksInterface |
    setBookmarksInterface