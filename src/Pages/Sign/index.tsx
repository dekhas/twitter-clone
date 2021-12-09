import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@mui/styles";
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import TextField from "@mui/material/TextField";
import ModalDialog from "../Components/ModalDialog";
import DialogActions from "@mui/material/DialogActions";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    wrapper: {
        display: "flex",
        height: "100vh",
    },
    blueSideWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1DA1F2",
        flex: "0 0 50%",
    },
    blueSideList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        "& h6": {
            color: "white",
            fontWeight: 900,
            textAlign: "left",
            marginBottom: 20,
            marginTop: 20,
        },
    },
    blueSideIcons: {
        padding: "0 0 0 24",
    },
    loginSide: {
        display: "flex",
        alignItems: "center",
        flex: "0 0 50%",
    },
    loginSideWrapper: {
        width: 900,
    },
    loginSideIcon: {
        marginRight: 900,
    },
    loginSideTitle: {
        padding: 25,
        paddingLeft: 0,
        "& h1": {
            fontWeight: 700,
        },
    },
    loginSideText: {
        "& h6": {
            fontWeight: 500,
            textAlign: "left",
        },
    },
    loginSideButton: {
        padding: 5,
        paddingLeft: 0,
        width: 380,
    },
}));

const SignIn: React.FC = (): React.ReactElement => {
    document.title = "Sign";

    const [visibleModal, setVisibleModal] = useState<"SignIn" | "SignUp">();
    // @ts-ignore
    const classes = useStyles();

    const handleClickOpenSignIn = (): void => {
        setVisibleModal("SignIn");
    };

    const handleClickOpenSignUp = (): void => {
        setVisibleModal("SignUp");
    };

    const handleClickClose = (): void => {
        setVisibleModal(undefined);
    };

    return (
        <div className={classes.wrapper}>
            <section className={classes.blueSideWrapper}>
                <ul className={classes.blueSideList}>
                    <li>
                        <Typography variant={"h6"}><SearchIcon fontSize={"large"}/>Читайте то о чем вам интересно</Typography>
                    </li>
                    <li>
                        <Typography variant={"h6"}><PeopleIcon fontSize={"large"}/>Узнайте о чем говорит мир!</Typography>
                    </li>
                </ul>
            </section>
            <section className={classes.loginSide}>
                <div className={classes.loginSideWrapper}>
                    <div className={classes.loginSideIcon}>
                        <TwitterIcon color={"primary"} fontSize={"large"}/>
                    </div>
                    <div className={classes.loginSideTitle}>
                        <Typography align={"left"} variant={"h1"} gutterBottom={true}>В курсе происходящего</Typography>
                    </div>
                    <div className={classes.loginSideText}>
                        <Typography variant={"h6"}>Присоединяйтесь к Твиттеру прямо сейчас!</Typography>
                    </div>
                    <div className={classes.loginSideButton}>
                        <Button color={"primary"} variant={"contained"} onClick={handleClickOpenSignUp} fullWidth>
                            Зарегистрироваться
                        </Button>
                        <ModalDialog closeVisible={handleClickClose} title={"Регистрация"} visible={visibleModal === "SignUp"}>
                            <TextField
                                fullWidth
                                id={"login"}
                                label={"Никнейм"}
                                type={"login"}
                                variant={"filled"}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                id={"E-Mail"}
                                label={"Почта"}
                                type={"E-Mail"}
                                variant={"filled"}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                id={"password"}
                                label={"Пароль"}
                                type={"password"}
                                variant={"filled"}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                id={"confirm-password"}
                                label={"Подтвердите пароль"}
                                type={"confirm-password"}
                                variant={"filled"}
                            />
                            <DialogActions>
                                <Button onClick={handleClickClose} variant={"contained"} fullWidth>
                                    <NavLink to={"/home"} style={{textDecoration: "none", color: "white"}}>Зарегистроваться</NavLink>
                                </Button>
                                <Button onClick={handleClickClose} variant={"contained"} fullWidth>
                                    Выход
                                </Button>
                            </DialogActions>
                        </ModalDialog>
                    </div>
                    <div className={classes.loginSideButton}>
                        <Button color={"primary"} variant={"outlined"} fullWidth onClick={handleClickOpenSignIn}>
                            Войти
                        </Button>
                        <ModalDialog closeVisible={handleClickClose} title={"Войти"} visible={visibleModal === "SignIn"}>
                            <TextField
                                fullWidth
                                id={"E-Mail"}
                                label={"Почта"}
                                type={"E-Mail"}
                                variant={"filled"}
                            />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                id={"password"}
                                label={"Пароль"}
                                type={"password"}
                                variant={"filled"}
                            />
                            <DialogActions>
                                <Button onClick={handleClickClose} variant={"contained"} fullWidth>
                                    <NavLink to={"/home"} style={{textDecoration: "none", color: "white"}}>Войти</NavLink>
                                </Button>
                                <Button onClick={handleClickClose} variant={"contained"} fullWidth>
                                    Выход
                                </Button>
                            </DialogActions>
                        </ModalDialog>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default SignIn;