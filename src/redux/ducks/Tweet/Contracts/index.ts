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
    createdAt: string,
}

export interface TweetState {
    items: Tweet[],
    userItems: Tweet[],
    loadingState: LoadingState,
}