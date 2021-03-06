import produce, {Draft} from "immer";
import {UserState} from "./Contracts";
import {UserActions, UserActionTypes} from "./actionCreators";
import {LoadingState} from "../../../types/loadingState";

const initialState:UserState = {
    data: null,
    loadingState: LoadingState.NEVER,
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.SET_USER_DATA: {
            draft.data = action.payload;
            draft.loadingState = LoadingState.LOADED;
            break;
        }
        case UserActionTypes.REGISTER_USER: {
            draft.loadingState = LoadingState.LOADING;
            break;
        }
        case UserActionTypes.LOGIN_USER: {
            draft.loadingState = LoadingState.LOADING;
            break;
        }
        case UserActionTypes.LOADING_STATE: {
            draft.loadingState = action.payload;
            break;
        }
        case UserActionTypes.SET_BOOKMARKS: {
            if (draft.data) {
                draft.data.bookmarks = action.payload;
            }
            break;
        }
        case UserActionTypes.ADD_USER_BOOKMARK: {
            if (draft.data && draft.data.bookmarks) {
                draft.data.bookmarks.push(action.payload)
            }
            break;
        }
        case UserActionTypes.DELETE_BOOKMARK: {
            if (draft.data && draft.data.bookmarks) {
                draft.data.bookmarks = draft.data.bookmarks.filter(item => item._id !== action.payload);
            }
            break;
        }
        case UserActionTypes.FETCH_BOOKMARKS:
            break;
        case UserActionTypes.FETCH_USER:
            break;
        case UserActionTypes.AUTH_ME:
            break;
        default:
            break;
    }
}, initialState);