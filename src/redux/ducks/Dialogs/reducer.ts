import {DialogsInterface} from "./Contracts";
import {LoadingState} from "../../../types/loadingState";
import produce, {Draft} from "immer";
import {DialogsActions, DialogsActionTypes} from "./actionCreators";

const initialState: DialogsInterface = {
    data: [],
    loadingStatus: LoadingState.NEVER,
};


export const dialogsReducer = produce((draft: Draft<DialogsInterface>, action: DialogsActions) => {
    switch (action.type) {
        case DialogsActionTypes.FETCH_DIALOGS: {
            break;
        }
        case DialogsActionTypes.SET_DIALOGS: {
            draft.data = action.payload;
            draft.loadingStatus = LoadingState.LOADED;
            break;
        }
        case DialogsActionTypes.SET_LOADING_STATE: {
            draft.loadingStatus = action.payload;
            break;
        }
        case DialogsActionTypes.ADD_MESSAGE: {
            draft.data[action.index].messages.unshift(action.payload);
            break;
        }
        default: {
            break;
        }
    }
}, initialState);