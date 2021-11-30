import React from "react";
import {Avatar, Grid, IconButton, Paper, Typography} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatIcon from "@mui/icons-material/Repeat";
import ReplyIcon from "@mui/icons-material/Reply";
import {makeStyles} from "@mui/styles/";
import theme from "../theme";

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
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
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
}

const Tweet: React.FC<TweetProps> = ({user, text, _id}: TweetProps): React.ReactElement => {
    const classes = useTweetStyles();

    return (
        <Paper className={classes.tweets} variant={"outlined"}>
            <Grid container spacing={3}>
                <Grid item xs={1}>
                    <Avatar alt={"Profile Avatar" + user.username} src={user.avatarUrl}/>
                </Grid>
                <Grid item xs={11}>
                    <div>
                        <b>{user.fullname}</b> <span>@{user.username} - 1ч.</span>
                    </div>
                    <Typography variant={"body1"} gutterBottom>
                        {text}
                    </Typography>
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