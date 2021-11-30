import React from "react";
import {IconButton} from "@mui/material";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useDispatch} from "react-redux";
import {clearTweetData} from "../redux/ducks/tweetPage/Contracts/actionCreators";

const BackButton:React.FC = ():React.ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = ():void => {
        dispatch(clearTweetData());
        history.goBack();
    };

    return (
        <IconButton onClick={handleClick}>
             <ArrowBackIcon color={'primary'}/>
        </IconButton>
    )
};

export default BackButton;