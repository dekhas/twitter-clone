import {LoadingState, Tweet} from "../../Tweet/Contracts";

export interface TweetData {
    data: Tweet | null,
    loadingState: LoadingState,
}