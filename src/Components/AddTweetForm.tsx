import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import {makeStyles} from "@mui/styles/";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {fetchAddTweet} from "../redux/ducks/Tweet/actionCreators";

const useAddTweetFormStyles = makeStyles(() => ({
    addFormBody: {
        display: "flex",
        width: "100%"
    },
    addFormBottom: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    addFormBottomActions: {
        marginTop: 5,
        paddingLeft: 50,
    },
    addFormTextarea: {
        width: "100%",
        border: 0,
        fontSize: 20,
        outlined: "none",
        resize: "none",
        fontFamily: "inherit",
    },
    addFormBottomLine: {
        height: 12,
        background: "#E6ECF0",
    },
    addFormCircleProgress: {
        position: "relative",
        width: 20,
        height: 20,
        margin: "0 10px",
        "& .MuiCircularProgress-root": {
            position: "absolute",
        },
    },
    addFormBottomRight: {
        display: "flex",
        alignItems: "center",
    },
}));

interface AddTweetFormProps {
    userName: string,
    avatarURL?: string,
    maxRows?: number,
}

const AddTweetForm: React.FC<AddTweetFormProps> = ({userName, avatarURL,maxRows}): React.ReactElement => {
    const classes = useAddTweetFormStyles();
    const [text, setText] = useState<string>('');
    const dispatch = useDispatch();

    const textPercentage = Math.floor((text.length / 280) * 100);

    const handleChangeTextArea = (e: React.FormEvent<HTMLTextAreaElement>):void => {
        if(e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    const handleClickAddTweet = ():void => {
        dispatch(fetchAddTweet(text));
        setText('');
    };

    return (
        <div>
            <div className={classes.addFormBody}>
                <div>
                    <Avatar alt={`Avatar ${userName}`}
                            src={avatarURL}
                            style={{marginRight: 15}}/>
                </div>
                <TextareaAutosize maxRows={maxRows} onChange={handleChangeTextArea} value={text} className={classes.addFormTextarea} placeholder={"Что происходит?"}/>

            </div>
            <div className={classes.addFormBottom}>
                <div className={classes.addFormBottomActions}>
                    <IconButton>
                        <InsertEmoticonIcon color={"primary"}/>
                    </IconButton>
                    <IconButton>
                        <InsertPhotoOutlinedIcon color={"primary"}/>
                    </IconButton>
                </div>
                {text && (
                    <>
                        <div className={classes.addFormBottomRight}>
                            <span>{280 - text.length}</span>
                            <div className={classes.addFormCircleProgress}>
                                <CircularProgress size={20}
                                                  variant={"determinate"}
                                                  thickness={4}
                                                  value={textPercentage > 100 ? 100 : textPercentage}
                                                  style={textPercentage >= 100 ? {color:"red"} : undefined}/>
                                <CircularProgress size={20}
                                                  variant={"determinate"}
                                                  thickness={4}
                                                  value={100}
                                                  style={{color: "rgba(0,0,0,0.1)"}}/>
                            </div>
                            <Button onClick={handleClickAddTweet} disabled={textPercentage >= 100} color={"primary"} variant={"contained"} style={{borderRadius: 30,}}>
                                <span style={{textTransform: "none"}}>Твитнуть</span>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default AddTweetForm;