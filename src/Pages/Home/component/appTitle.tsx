import React from 'react'
import {Paper, Typography} from "@mui/material";
import useHomeStyles from "../indexTheme";
import BackButton from "../../../Components/BackButton";

interface TitleProps {
    withBackButton: boolean,
    text: string,
}

const AppTitle: React.FC<TitleProps> = ({text, withBackButton}): React.ReactElement => {
    const classes = useHomeStyles();

    return (
        <Paper style={{borderTop: 0, borderLeft: 0, borderRight: 0, padding: 10,}} variant={'outlined'}>
            <div className={withBackButton ? classes.mainTweet : undefined}>
                {withBackButton ? <BackButton/> : null}
                <Typography style={{fontWeight: 780}} variant={"h6"}>{text}</Typography>
            </div>
        </Paper>
    )
};

export default AppTitle;