import React, {useState} from "react";
import {Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Button from "@mui/material/Button";
import ModalDialog from "../../Components/ModalDialog";
import AddTweetForm from "../../Components/AddTweetForm";
import useHomeStyles from "../Home/indexTheme";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogs, selectUserData} from "../../redux/selectors";
import style from "./style.module.css"
import Avatar from "@mui/material/Avatar";
import UserDialog from "./components/UserDialog";
import {fetchDialogs} from "../../redux/ducks/Dialogs/actionCreators";

const Messages = () => {
    const dispatch = useDispatch();

    const classes = useHomeStyles();

    const [isAddTweetOpen, setIsAddTweetOpen] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>();

    const handleIsOpen = () => {
        setIsAddTweetOpen(!isAddTweetOpen);
    };

    React.useEffect(() => {
        dispatch(fetchDialogs())
        // eslint-disable-next-line
    }, []);

    const user = useSelector(selectUserData);
    const dialogs = useSelector(selectDialogs);

    document.title = `Messages`;

    return (
        <div>
            <Container className={classes.wrapper} maxWidth={"lg"}>
                <Grid style={{height: "100vh"}} container spacing={3}>
                    <Grid item xs={3}>
                        <ul className={classes.sideMenu}>
                            <li className={classes.sideMenuItem}>
                                <IconButton>
                                    <NavLink to={"/home"}>
                                        <TwitterIcon fontSize={"large"} color={"primary"}/>
                                    </NavLink>
                                </IconButton>
                            </li>
                            <li className={classes.sideMenuItem}>
                                <div>
                                    <SearchIcon fontSize={"large"}/>
                                    <Typography variant={"h6"}
                                                sx={{display: {"xs": "none", "md": "block"}}}>Поиск</Typography>
                                </div>
                            </li>
                            <li className={classes.sideMenuItem}>
                                <div>
                                    <NotificationsNoneIcon fontSize={"large"}/>
                                    <Typography variant={"h6"}
                                                sx={{display: {"xs": "none", "md": "block"}}}>Оповещения</Typography>
                                </div>
                            </li>
                            <li className={classes.sideMenuItem}>
                                <div>
                                    <MailOutlineIcon fontSize={"large"}/>
                                    <NavLink to={'/home/messages'}>
                                        <Typography variant={"h6"}
                                                    sx={{display: {"xs": "none", "md": "block"}}}>Сообщения</Typography>
                                    </NavLink>
                                </div>
                            </li>
                            <li className={classes.sideMenuItem}>
                                <div>
                                    <BookmarkBorderIcon fontSize={"large"}/>
                                    <Typography variant={"h6"}
                                                sx={{display: {"xs": "none", "md": "block"}}}>Закладки</Typography>
                                </div>
                            </li>
                            <li className={classes.sideMenuItem}>
                                <div>
                                    <ListAltIcon fontSize={"large"}/>
                                    <Typography variant={"h6"}
                                                sx={{display: {"xs": "none", "md": "block"}}}>Список</Typography>
                                </div>
                            </li>
                            <li className={classes.sideMenuItem}>
                                <div>
                                    <PersonOutlineIcon fontSize={"large"}/>
                                    <NavLink to={`/user/${user?.username}`}>
                                        <Typography variant={"h6"}
                                                    sx={{display: {"xs": "none", "md": "block"}}}>Профиль</Typography>
                                    </NavLink>
                                </div>
                            </li>
                            <li>
                                <Button onClick={handleIsOpen} style={{borderRadius: 30, marginTop: 25}}
                                        variant={"contained"} color={"primary"} fullWidth>
                                    <Typography style={{
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        textTransform: "none",
                                        fontWeight: 700
                                    }}>Твитнуть</Typography>
                                </Button>
                                <ModalDialog title={"Твитнуть"} visible={isAddTweetOpen} closeVisible={handleIsOpen}>
                                    <AddTweetForm maxRows={15} userName={"userName"}
                                                  avatarURL={"https://bit.ly/3DWYupU"}/>
                                </ModalDialog>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper style={{height: "100%", borderBottom: 0, borderTop: 0,}} variant={"outlined"}>
                            {dialogs ? <div>
                                <div className={style.messages_header}>
                                    <div>
                                        <b>Сообщения</b>
                                        <Button style={{borderRadius: 30}}>
                                            <MailOutlineIcon style={{fill: "black"}}/>
                                        </Button>
                                    </div>
                                </div>
                                {dialogs.map((item, index) => {
                                    return (
                                        <div key={`${item}_${index}`}>
                                            <Paper
                                                onClick={() => setActiveIndex(index)}
                                                className={style.messages_choose_friend_background}
                                                style={activeIndex === index ? {
                                                    borderTop: 0,
                                                    borderLeft: 0,
                                                    borderRight: 0,
                                                    borderRadius: 0,
                                                    backgroundColor: "rgb(245, 248, 250)",
                                                    cursor: "pointer",
                                                } : {borderTop: 0, borderLeft: 0, borderRight: 0, borderRadius: 0, cursor: "pointer",}}
                                                variant={'outlined'}>
                                                <div className={style.messages_choose_friend}>
                                                    <div style={{marginRight: 5}}>
                                                        <Avatar/>
                                                    </div>
                                                    <div className={style.messages_choose_friend_info}>
                                                        <b>{item.to.fullname}</b>
                                                        <span>{item.messages[0].message}</span>
                                                    </div>
                                                </div>
                                            </Paper>
                                        </div>
                                    )
                                })}
                            </div> : <div>Messages</div>}
                        </Paper>
                    </Grid>
                    <Grid style={{paddingLeft: 5, paddingRight: 5}} item xs={5}>
                        <Paper style={{height: "100%", borderBottom: 0, borderTop: 0, borderLeft: 0}}
                               variant={"outlined"}>

                            {!(activeIndex || activeIndex === 0) ? <div className={style.messages_no_messages_wrapper}>
                                <h1>Вы не выбрали сообщение</h1>
                                <span style={{color: 'gray'}}>Выберите кому написать сообщение</span>
                            </div> : <UserDialog activeIndex={activeIndex} messages={[...dialogs[activeIndex].messages].reverse()} userID={user?._id} />}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
};

export default Messages