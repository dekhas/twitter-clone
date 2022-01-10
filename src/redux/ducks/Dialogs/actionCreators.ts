import {Action} from "redux";
import {LoadingState} from "../../../types/loadingState";
import {DialogsInterface, MessagesInterface} from "./Contracts";

export enum DialogsActionTypes {
    SET_LOADING_STATE = "dialogs/SET_LOADING_STATE",
    FETCH_DIALOGS = 'dialogs/FETCH_DIALOGS',
    SET_DIALOGS = 'dialogs/SET_DIALOGS',
    ADD_MESSAGE = 'dialogs/ADD_MESSAGE',
}

export interface addMessageActionInterface extends Action<DialogsActionTypes>{
    type: DialogsActionTypes.ADD_MESSAGE,
    payload: MessagesInterface,
    index: number,
}

export interface setDialogsLoadingStateInterface extends Action<DialogsActionTypes> {
    type: DialogsActionTypes.SET_LOADING_STATE,
    payload: LoadingState,
}

export interface fetchDialogsInterface extends Action<DialogsActionTypes>{
    type: DialogsActionTypes.FETCH_DIALOGS,
}

export interface setDialogsInterface extends Action<DialogsActionTypes>{
    type: DialogsActionTypes.SET_DIALOGS,
    payload: DialogsInterface['data'],
}

export const addMessage = (payload: any, index: number): addMessageActionInterface => ({
    type: DialogsActionTypes.ADD_MESSAGE,
    payload,
    index,
});

export const setDialogsLoadingState = (payload: LoadingState): setDialogsLoadingStateInterface => ({
    type: DialogsActionTypes.SET_LOADING_STATE,
    payload,
});

export const setDialogs = (payload: DialogsInterface['data']): setDialogsInterface => ({
    type: DialogsActionTypes.SET_DIALOGS,
    payload,
});

export const fetchDialogs = (): fetchDialogsInterface => ({
    type: DialogsActionTypes.FETCH_DIALOGS,
});

export type DialogsActions = setDialogsLoadingStateInterface |
    setDialogsInterface |
    fetchDialogsInterface |
    addMessageActionInterface