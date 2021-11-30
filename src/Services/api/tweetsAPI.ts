import {axios} from "../../core/axios";
import {TweetState, Tweet} from "../../redux/ducks/Tweet/Contracts";

interface Response<T> {
    status: string,
    data?: T,
    message?: string,
}

export const TweetsAPI = {
    fetchTweets() {
        return axios.get<Response<TweetState["items"]>>('/tweets').then(({data}) => data.data)
    },
    fetchTweetData(tweetId: string) {
        return axios.get<Response<Tweet>>(`/tweet/${tweetId}`).then(({data}) => data.data)
    },
    addTweet(payload: string) {
        return axios.post<Response<Tweet>>("/tweet", {text: payload}).then(({data}) => data.data)
    },
};


//"https://trycode.pw/c/2OBQ1.json"