import {LoadingState} from "../../../../types/loadingState";

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
}

export interface UserState {
    data: UserInterface | null,
    loadingState: LoadingState
}