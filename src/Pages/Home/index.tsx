import React, {useEffect, useState} from "react";
import {Container, Grid, IconButton, Paper, Typography,} from "@mui/material/";
import {Link, NavLink, Route} from "react-router-dom";
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
import {selectLoadingState, selectTweets} from "../../redux/selectors"
import {LoadingState} from "../../redux/ducks/Tweet/Contracts";
import TweetPage from "./component/tweetPage"
import BackButton from "../../Components/BackButton";
import Loader from "../../Components/Loader";

const Home: React.FC = (): React.ReactElement => {
    document.title = "Home";
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTweets())
        // eslint-disable-next-line
    }, [dispatch, fetchTweets]);

    const[isAddTweetOpen, setIsAddTweetOpen] = useState<boolean>(false);

    const handleIsOpen = () => {
        setIsAddTweetOpen(!isAddTweetOpen);
    };

    const classes = useHomeStyles();


    const tweets = useSelector(selectTweets);
    const isLoading = useSelector(selectLoadingState);

    console.log(tweets);

    return (
        <Container className={classes.wrapper} maxWidth={"lg"}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <ul className={classes.sideMenu}>
                        <li className={classes.sideMenuItem}>
                            <IconButton>
                                <NavLink to={"/"}>
                                    <TwitterIcon fontSize={"large"} color={"primary"}/>
                                </NavLink>
                            </IconButton>
                        </li>
                        <li className={classes.sideMenuItem}>
                            <div>
                                <SearchIcon fontSize={"large"}/>
                                <Typography variant={"h6"} sx={{display: {"xs": "none", "md": "block"}}}>Поиск</Typography>
                            </div>
                        </li>
                        <li className={classes.sideMenuItem}>
                            <div>
                                <NotificationsNoneIcon fontSize={"large"}/>
                                <Typography variant={"h6"} sx={{display: {"xs": "none", "md": "block"}}}>Оповещения</Typography>
                            </div>
                        </li>
                        <li className={classes.sideMenuItem}>
                            <div>
                                <MailOutlineIcon fontSize={"large"}/>
                                <Typography variant={"h6"} sx={{display: {"xs": "none", "md": "block"}}}>Сообщения</Typography>

                            </div>
                        </li>
                        <li className={classes.sideMenuItem}>
                            <div>
                                <BookmarkBorderIcon fontSize={"large"}/>
                                <Typography variant={"h6"} sx={{display: {"xs": "none", "md": "block"}}}>Закладки</Typography>
                            </div>
                        </li>
                        <li className={classes.sideMenuItem}>
                            <div>
                                <ListAltIcon fontSize={"large"}/>
                                <Typography variant={"h6"} sx={{display: {"xs": "none", "md": "block"}}}>Список</Typography>
                            </div>
                        </li>
                        <li className={classes.sideMenuItem}>
                            <div>
                                <PersonOutlineIcon fontSize={"large"}/>
                                <Typography variant={"h6"} sx={{display: {"xs": "none", "md": "block"}}}>Профиль</Typography>
                            </div>
                        </li>
                        <li>
                            <Button onClick={handleIsOpen} style={{borderRadius: 30, marginTop:25}} variant={"contained"} color={"primary"} fullWidth>
                                <Typography style={{paddingTop: 10,paddingBottom: 10, textTransform: "none", fontWeight: 700}}>Твитнуть</Typography>
                            </Button>
                            <ModalDialog title={"Твитнуть"} visible={isAddTweetOpen} closeVisible={handleIsOpen}>
                                <AddTweetForm maxRows={15} userName={"userName"} avatarURL={"https://bit.ly/3DWYupU"}/>
                            </ModalDialog>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{height: "100%", borderBottom: 0, borderTop: 0,}} variant={"outlined"}>
                        <Route exact path={"/home"}>
                            <Paper style={{borderTop: 0, borderLeft: 0, borderRight: 0, padding: 10,}} variant={'outlined'}>
                                <Typography style={{fontWeight: 780}} variant={"h6"}>Главная</Typography>
                            </Paper>
                        </Route>
                        <Route path={"/home/tweet/:id"}>
                            <Paper style={{borderTop: 0, borderLeft: 0, borderRight: 0, padding: 10,}} variant={'outlined'}>
                                <div className={classes.mainTweet}>
                                    <BackButton/>
                                    <Typography style={{fontWeight: 780}} variant={"h6"}>Твит</Typography>
                                </div>
                            </Paper>
                            <TweetPage/>
                        </Route>
                        <Route exact path={"/home"}>
                            <Paper>
                                <div style={{padding: 20}}>
                                    <AddTweetForm userName={"userName"} avatarURL={"https://bit.ly/3DWYupU"}/>
                                </div>
                            </Paper>
                            <div style={{height: 12, backgroundColor: "lightGrey"}}/>
                            { isLoading === LoadingState.LOADED ? tweets.map((item) => (
                                <Link key={item._id} to={`/home/tweet/${item._id}`} style={{textDecoration: "none", font: "inherit"}}>
                                    <Tweet {...item}/>
                                </Link>
                            )) : <div style={{margin: 200}}><Loader/></div>}
                            <Tweet _id={"9bwq1apw5c"}
                                   user={{fullname: "User", username:"user", avatarUrl: "https://bit.ly/3DWYupU"}}
                                   text={"Жили у бабуси два веселых гуся. Один серый, другой белый. Два веселых гуся)"}/>
                        </Route>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <p style={{position: "sticky", top:0,}}>Coming soon...</p>
                </Grid>
            </Grid>
        </Container>
    )
};

export default Home;