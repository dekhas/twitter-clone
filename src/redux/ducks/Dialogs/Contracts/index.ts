import {UserInterface} from "../../User/Contracts";
import {LoadingState} from "../../../../types/loadingState";

export interface MessagesInterface {
    _id: string,
    user: string,
    message: string,
    conversation: string,
}

export interface ConversationInterface {
    _id: string,
    users: UserInterface[] | string[],
    messages: MessagesInterface[] | string[],
}

export interface DialogInterface {
    to: UserInterface,
    messages: MessagesInterface[],
    conversation: string,
}

export interface DialogsInterface {
    data: DialogInterface[],
    loadingStatus: LoadingState,
}