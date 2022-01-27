import React from "react";
import style from "./style.module.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {TweetState} from "../../redux/ducks/Tweet/Contracts";
import AppTitle from "../../Components/appTitle";
import Tweet from "../../Components/Tweet";

interface BookmarksPropsInterface {
    bookmarks?: TweetState["items"],
    username: string,
}

const Bookmarks: React.FC<BookmarksPropsInterface> = ({bookmarks, username}): React.ReactElement => {
    document.title = 'Bookmarks';

    return (
        <div>
            {bookmarks ? <div>
                    <AppTitle withBackButton text={`Закладки`}>
                        <span>{`@${username}`}</span>
                    </AppTitle>
                    {bookmarks?.map((item, index) => {
                        return <div key={`${item._id}_${index}_bookmark`}>
                            <Tweet {...item} />
                        </div>
                    })}
                </div>
                : <div className={style.wrapper_no_bookmarks}>
                    <h1>Добавьте свою закладку</h1>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <h1>Через кнопку </h1>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <MoreVertIcon fontSize={"large"}/>
                        </div>
                    </div>
                </div>}
        </div>
    )
};

export default Bookmarks