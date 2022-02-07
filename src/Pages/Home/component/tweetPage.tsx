import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {fetchTweet} from "../../../redux/ducks/tweetPage/Contracts/actionCreators";
import {selectTweetData, selectUserData} from "../../../redux/selectors";
import Tweet from "../../../Components/Tweet";
import Loader from "../../../Components/Loader";

const TweetPage:React.FC = ():React.ReactElement | null => {
    const dispatch = useDispatch();
    const params: {id: string} = useParams();
    const id = params.id;
    const tweetData = useSelector(selectTweetData);
    const user = useSelector(selectUserData);

    React.useEffect(() => {
        if (id) {
            dispatch(fetchTweet(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch]);

    console.log(tweetData);

    if (!tweetData) {
        return <div style={{marginLeft: 220, marginTop: 30}}><Loader/></div>
    }

    return (
        <Tweet {...tweetData} bookmarked={!!user?.bookmarks?.find((elem) => elem._id === id)}/>
    );
};

export default TweetPage;