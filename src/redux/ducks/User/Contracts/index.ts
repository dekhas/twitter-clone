import {LoadingState} from "../../../../types/loadingState";

export interface UserInterface {
    _id?: string;
    email: string;
    fullname: string;
    username: string;
    password: string;
    confirmed_hash: string;
    token?: string,
    location?: string;
    confirmed?: boolean;
    about?: string;
    website?: string;
}

export interface UserState {
    data: UserInterface | null,
    loadingState: LoadingState
}