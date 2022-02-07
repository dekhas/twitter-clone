import React from "react";
import {Avatar, Grid, IconButton, Paper, Typography} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import ReplyIcon from "@mui/icons-material/Reply";
import {makeStyles} from "@mui/styles/";
import theme from "../theme";
import {formatTime} from "../utils/formate";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {addBookmark, deleteTweet} from "../redux/ducks/Tweet/actionCreators";
import {Tweet as TweetInterface} from "../redux/ducks/Tweet/Contracts";
import {deleteBookmark} from "../redux/ducks/User/actionCreators";

const useTweetStyles = makeStyles(() => ({
    tweetsIcons: {
        display: "flex",
        justifyContent: "space-between",
        width: 450,
        "& div": {
            "&:hover": {
                "& svg": {
                    fill: theme.palette.primary.main,
                },
            },
        },
    },
    tweets: {
        borderWidth: 1,
        padding: 10,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgb(245, 248, 250)",
        },
    },
}));

interface TweetProps {
    _id: string,
    user: {
        fullname: string,
        username: string,
        avatarUrl: string,
    },
    text: string,
    createdAt: string,
    link?: string,
    bookmarked: boolean,
}

const Tweet: React.FC<TweetProps> = ({user, createdAt, text, _id, link, bookmarked}): React.ReactElement => {
    const classes = useTweetStyles();

    const history = useHistory();

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation()
    };
    const handleClose = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
        event.stopPropagation()
    };

    const handleAddBookmark = (event: React.MouseEvent<HTMLElement>) => {
        const tweetData: TweetInterface = {
            _id,
            user,
            text,
            createdAt,
        };

        dispatch(addBookmark(tweetData, _id));

        event.stopPropagation()
    };

    const handleDeleteBookmark = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(deleteBookmark(_id));

        event.stopPropagation()
    };

    const handleDeleteTweet = (event: React.MouseEvent<HTMLElement>) => {
        dispatch(deleteTweet(_id));

        event.stopPropagation();
    };

    const changeLink = () => {
        if (link) {
            history.push(`/home/tweet/${link}`)
        }
    };

    return (
        <Paper style={{
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
            borderRadius: 0,
        }} onClick={changeLink} className={classes.tweets} variant={"outlined"}>
            <Grid container spacing={3}>
                <Grid item xs={1}>
                    <Avatar alt={"Profile Avatar" + user.username} src={user.avatarUrl}/>
                </Grid>
                <Grid item xs={11}>
                    <div>
                        <div style={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                            <div>
                                <b>{user.fullname}</b> <span>@{user.username} - {formatTime(createdAt)}</span>
                            </div>
                            <div>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls="long-menu"
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                                <Menu id="long-menu"
                                      MenuListProps={{
                                          'aria-labelledby': 'long-button',
                                      }}
                                      anchorEl={anchorEl}
                                      open={open}
                                      onClose={handleClose}>
                                    <MenuItem onClick={handleDeleteTweet}><span style={{color: "red"}}>Удалить</span></MenuItem>
                                    <MenuItem>{bookmarked ? <span onClick={handleDeleteBookmark}>Убрать из закладок</span>
                                        : <span onClick={handleAddBookmark}>Добавить в закладки</span>}</MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <Typography variant={"body1"} gutterBottom>
                            {text}
                        </Typography>
                    </div>
                    <div className={classes.tweetsIcons}>
                        <div>
                            <IconButton>
                                <ChatBubbleOutlineIcon/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton>
                                <FavoriteBorderIcon/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton>
                                <RepeatIcon/>
                            </IconButton>
                        </div>
                        <div>
                            <IconButton>
                                <ReplyIcon/>
                            </IconButton>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
};

export default Tweet;