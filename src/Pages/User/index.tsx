import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectIsAuth, selectUserId} from "../../redux/selectors";
import UserAPI from "../../Services/api/userAPI";
import {UserInterface} from "../../redux/ducks/User/Contracts";
import Loader from "../../Components/Loader";
import {Avatar, Button, Typography} from "@mui/material";
import AppTitle from "../../Components/appTitle";
import style from "./style.module.css"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ModalDialog from "../../Components/ModalDialog";
import DialogActions from "@mui/material/DialogActions";
import format from "date-fns/format"

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

    const handleSetUserData = async (id: string) => {
        setUserData(await UserAPI.getUser(id));
        return
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

    console.log(userData);

    const isRegister = isAuth && userId === id;

    return (
        <div>
            {userData ?
                <div>
                    <AppTitle text={userData?.fullname} withBackButton>
                        <Typography variant={"caption"}>0 твитов</Typography>
                    </AppTitle>
                    <div className={style.user_header}/>
                    <div className={style.user_info}>
                        <div>
                            <Avatar style={{width: 140, height: 140, border: "5px solid white"}}
                                    alt={`${userData?.username} avatar`}
                                    src={userData?.avatar}/>
                        </div>
                        <h2 style={{margin: 0}}>{userData?.fullname}</h2>
                        <span style={{color: 'gray'}}>@{userData?.username}</span>
                        <p>{userData?.about}</p>
                        <ul className={style.user_info_about}>
                            {userData?.location ? <li>{userData?.location}</li> : null}
                            <li>
                                <a href={userData?.website}>{userData?.website}</a>
                            </li>
                            {userData?.createdAt ? <li>Дата регистрации: {format(new Date(userData?.createdAt), 'MMMMMM y') }</li> : null}
                            <li>Дата рождения: 2004г.</li>
                        </ul>
                        {isRegister ?
                            <div>
                                <Button onClick={handleOpenEditProfile} style={{borderRadius: 30}} variant={"contained"}
                                        color={"primary"}>
                                    <Typography variant={'inherit'}>Редактировать</Typography>
                                </Button>
                                <ModalDialog title={'Редактировать профиль'} visible={open}
                                             closeVisible={handleCloseEditProfile}>
                                    <DialogActions>
                                        <Button type='submit' variant={"contained"} fullWidth>
                                            Изменить
                                        </Button>
                                    </DialogActions>
                                </ModalDialog>
                            </div>
                            : null}
                    </div>
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
                </div> : <Loader/>}
        </div>
    )
};

//
export default UserPage