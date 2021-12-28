import React from 'react'
import {Paper, Typography} from "@mui/material";
import useHomeStyles from "../Pages/Home/indexTheme";
import BackButton from "./BackButton";

interface TitleProps {
    withBackButton: boolean,
    text: string,
    children?: React.ReactNode
}

const AppTitle: React.FC<TitleProps> = ({text, withBackButton, children}): React.ReactElement => {
    const classes = useHomeStyles();

    return (
        <Paper style={{borderTop: 0, borderLeft: 0, borderRight: 0, padding: 10, borderRadius: 0, backgroundColor: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(5px)", top: 0, position: "sticky", zIndex: 100}} variant={'outlined'}>
            <div className={withBackButton ? classes.mainTweet : undefined}>
                {withBackButton ? <BackButton/> : null}
                <div>
                    <Typography style={{fontWeight: 780}} variant={"h6"}>{text}</Typography>
                    {children}
                </div>
            </div>
        </Paper>
    )
};

export default AppTitle;