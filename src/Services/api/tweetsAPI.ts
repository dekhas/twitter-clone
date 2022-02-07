import {axios} from "../../core/axios";
import {TweetState, Tweet} from "../../redux/ducks/Tweet/Contracts";
import Response from "../../types/ResponseType";

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
    fetchUserTweets(userID: string) {
        return axios.get<Response<TweetState['items']>>(`/tweets/${userID}`).then(({data}) => data.data)
    },
    addBookmark(tweetID: string) {
        return axios.post<Response<null>>('/bookmark', {tweet: tweetID})
    },
    deleteTweet(tweetID: string) {
        return axios.delete<Response<null>>(`/tweets/${tweetID}`)
    }
};


//"https://trycode.pw/c/2OBQ1.json"