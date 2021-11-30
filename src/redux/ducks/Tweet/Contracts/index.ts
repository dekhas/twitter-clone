export enum LoadingState {
    LOADED = 'LOADED',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
    LOADING = 'LOADING',
}

export interface Tweet {
    _id: string,
    user: {
        fullname: string,
        username: string,
        avatarUrl: string,
    },
    text: string,
    media?: string,
}

export interface TweetState {
    items: Tweet[],
    loadingState: LoadingState,
}