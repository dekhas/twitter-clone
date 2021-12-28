import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectUserId, selectUserTweetsData} from "../../redux/selectors";
import UserAPI from "../../Services/api/userAPI";
import {UserInterface} from "../../redux/ducks/User/Contracts";
import Loader from "../../Components/Loader";
import {Avatar, Button, Typography} from "@mui/material";
import AppTitle from "../../Components/appTitle";
import style from "./style.module.css"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./components/TabPanel";
import format from "date-fns/format";
import {fetchUserTweets} from "../../redux/ducks/Tweet/actionCreators";
import Tweet from "../../Components/Tweet";
import Paper from "@mui/material/Paper";
import ChangeProfileModal from "./components/ChangeProfileModal";

interface Params {
    id: string
}

const UserPage = () => {

    const {id}: Params = useParams();

    const [userData, setUserData] = React.useState<UserInterface>();
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const [open, setOpen] = React.useState<boolean>(false);

    const isAuth = useSelector(selectIsAuth);
    const userId = useSelector(selectUserId);
    const userTweets = useSelector(selectUserTweetsData);

    const dispatch = useDispatch();

    const handleSetUserData = async (id: string) => {
        setUserData(await UserAPI.getUser(id));
        return
    };

    const handleChangeUserData = (data: UserInterface) => {
        setUserData(data);
    };

    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleOpenEditProfile = () => {
        setOpen(true)
    };

    const handleCloseEditProfile = () => {
        setOpen(false)
    };



    document.title = userData ? `${userData?.fullname} (@${userData?.username})` : '';

    useEffect(() => {
        handleSetUserData(id);
    }, [id]);

    useEffect(() => {
        if (userData?._id) {
            dispatch(fetchUserTweets(userData._id))
        }
    }, [userData]);

    console.log(userData);
    console.log(userTweets);

    const isRegister = isAuth && userId === id;

    return (
        <div>
            {userData ?
                <div>
                    <AppTitle text={userData?.fullname} withBackButton>
                        <Typography variant={"caption"}>{userTweets.length} твитов</Typography>
                    </AppTitle>
                    <div className={style.user_header}/>
                    <div className={style.user_info}>
                        <div className={style.user_info_header}>
                            <Avatar style={{width: 140, height: 140, border: "5px solid white"}}
                                    alt={`${userData?.username} avatar`}
                                    src={userData?.avatar}/>
                            {isRegister ?
                                <div>
                                    <Button onClick={handleOpenEditProfile} style={{borderRadius: 30, position: "relative", top: "55%"}} variant={"contained"}
                                            color={"primary"}>
                                        <Typography style={{textTransform: "none"}} variant={'inherit'}>Редактировать</Typography>
                                    </Button>
                                    <ChangeProfileModal open={open} handleClose={handleCloseEditProfile} handleChangeUserData={handleChangeUserData}/>
                                </div>
                                :
                            <div>
                                <Button style={{borderRadius: 30, backgroundColor: 'black', position: "relative", top: "55%"}} variant={"contained"}>
                                    <b style={{textTransform: "none", fontWeight: 700}}>Читать</b>
                                </Button>
                            </div>}
                        </div>
                        <h2 style={{margin: 0}}>{userData?.fullname}</h2>
                        <span style={{color: 'gray'}}>@{userData?.username}</span>
                        <p>{userData?.about}</p>
                        <ul className={style.user_info_about}>
                            {userData?.location ? <li>{userData?.location}</li> : null}
                            <li>
                                <a href={userData?.website}>{userData?.website}</a>
                            </li>
                            {userData?.createdAt ?
                                <li>Дата регистрации: {format(new Date(userData?.createdAt), 'MMMMMM y')}</li> : null}
                            <li>Дата рождения: 2004г.</li>
                        </ul>
                    </div>
                    <Paper style={{borderRadius: 0, borderTop: 0, borderRight: 0, borderLeft: 0,}} variant={"outlined"}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleChangeTabs}
                            aria-label="wrapped label tabs example"
                        >
                            <Tab
                                value={0}
                                label="Твиты"
                            />
                            <Tab value={1} label="Медия"/>
                            <Tab value={2} label="Нравится"/>
                        </Tabs>
                    </Paper>
                    <div className={style.user_content_wrapper}>
                        <TabPanel value={tabIndex} index={0}>
                            {userTweets ? userTweets.map((item, index) => {
                                return (
                                    <div key={`${item._id}_${index}`}>
                                        <Tweet {...item}/>
                                    </div>
                                )
                            }) : <Loader/>}
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}/>
                        <TabPanel value={tabIndex} index={2}/>
                    </div>
                </div> : <Loader/>}
        </div>
    )
};

//
export default UserPage