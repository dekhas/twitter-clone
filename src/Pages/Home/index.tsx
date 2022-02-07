import React, {useEffect, useState} from "react";
import {Container, Grid, IconButton, Paper, Typography,} from "@mui/material/";
import {NavLink, Route} from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Tweet from "../../Components/Tweet";
import Button from "@mui/material/Button";
import AddTweetForm from "../../Components/AddTweetForm";
import useHomeStyles from "./indexTheme";
import ModalDialog from "../../Components/ModalDialog";
import {useDispatch, useSelector} from "react-redux";
import {fetchTweets} from "../../redux/ducks/Tweet/actionCreators";
import {selectLoadingState, selectTweets, selectUserData} from "../../redux/selectors"
import {LoadingState} from "../../redux/ducks/Tweet/Contracts";
import TweetPage from "./component/tweetPage"
import Loader from "../../Components/Loader";
import {authMe} from "../../redux/ducks/User/actionCreators";
import AppTitle from "../../Components/appTitle";
import UserPage from "../User";
import Bookmarks from "../Bookmarks";


const Home: React.FC = (): React.ReactElement => {
    document.title = "Home";
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTweets())
        // eslint-disable-next-line
    }, [dispatch, fetchTweets]);

    useEffect(() => {
        dispatch(authMe())
        // eslint-disable-next-line
    }, []);

    const [isAddTweetOpen, setIsAddTweetOpen] = useState<boolean>(false);

    const handleIsOpen = () => {
        setIsAddTweetOpen(!isAddTweetOpen);
    };

    const classes = useHomeStyles();


    const tweets = useSelector(selectTweets);
    const isLoading = useSelector(selectLoadingState);
    const user = useSelector(selectUserData);

    return (
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
                                <NavLink to={'/bookmarks'}>
                                    <Typography variant={"h6"}
                                                sx={{display: {"xs": "none", "md": "block"}}}>Закладки</Typography>
                                </NavLink>
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
                                <AddTweetForm maxRows={15} userName={"userName"} avatarURL={"https://bit.ly/3DWYupU"}/>
                            </ModalDialog>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{height: "100%", borderBottom: 0, borderTop: 0,}} variant={"outlined"}>
                        <Route exact path={"/home/tweet/:id"}>
                            <AppTitle text={'Твит'} withBackButton={true}/>
                            <TweetPage/>
                        </Route>
                        <Route exact path={"/home"}>
                            <AppTitle text={"Главная"} withBackButton={false}/>
                            <Paper>
                                <div style={{padding: 20}}>
                                    <AddTweetForm userName={"userName"} avatarURL={"https://bit.ly/3DWYupU"}/>
                                </div>
                            </Paper>
                            <div style={{height: 12, backgroundColor: "lightGrey"}}/>
                            {isLoading === LoadingState.LOADED ? tweets.map((item, index) => (
                                <div key={`${item}_${index}`}>
                                    <Tweet {...item} link={item._id} bookmarked={!!user?.bookmarks?.find((elem) => elem._id === item._id)}/>
                                </div>
                            )) : <div style={{margin: 200}}><Loader/></div>}
                        </Route>
                        <Route path={'/user/:id'}>
                            <UserPage/>
                        </Route>
                        <Route path={'/bookmarks'}>
                            <Bookmarks username={user ? user.username : ''} bookmarks={user?.bookmarks}/>
                        </Route>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <p style={{position: "sticky", top: 0,}}>Coming soon...</p>
                </Grid>
            </Grid>
        </Container>
    )
};

// <Tweet _id={"9bwq1apw5c"} user={{fullname: "User", username:"user", avatarUrl: "https://bit.ly/3DWYupU"}} text={"Жили у бабуси два веселых гуся. Один серый, другой белый. Два веселых гуся)"}/>
export default Home;