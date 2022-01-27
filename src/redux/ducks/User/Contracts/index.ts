import {LoadingState} from "../../../../types/loadingState";
import {ConversationInterface} from "../../Dialogs/Contracts";
import {Tweet} from "../../Tweet/Contracts";

export interface UserInterface {
    _id?: string;
    email: string;
    fullname: string;
    username: string;
    password: string;
    confirmed_hash: string;
    avatar?: string;
    token?: string;
    location?: string;
    confirmed?: boolean;
    about?: string;
    website?: string;
    createdAt?: string;
    updatedAt?: string;
    birthday?: string;
    conversations?: string[] | ConversationInterface[];
    bookmarks?: Tweet[];
}

export interface UserState {
    data: UserInterface | null,
    loadingState: LoadingState
}

export interface UserUpdateInterface {
    avatar?: string;
    location?: string;
    about?: string;
    website?: string;
    birthday?: string;
}