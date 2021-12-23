import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectIsAuth, selectUserId} from "../../redux/selectors";
import UserAPI from "../../Services/api/userAPI";
import {UserInterface} from "../../redux/ducks/User/Contracts";
import Loader from "../../Components/Loader";
import {Avatar, Button, Typography} from "@mui/material";
import AppTitle from "../../Components/appTitle";
import {Link} from "react-router-dom";

interface Params {
    id: string
}

const UserPage = () => {
    const {id}: Params = useParams();

    const [userData, setUserData] = React.useState<UserInterface>();

    const isAuth = useSelector(selectIsAuth);
    const userId = useSelector(selectUserId);

    const handleSetUserData = async (id: string) => {
        setUserData(await UserAPI.getUser(id));
        return
    };

    useEffect(() => {
        handleSetUserData(id)
    }, [id]);

    console.log(userData);

    const isRegister = isAuth && userId === id;

    return (
        <div>
            {userData ?
                <div>
                    <AppTitle text={userData?.fullname} withBackButton>
                        <Typography variant={"caption"} >0 твитов</Typography>
                    </AppTitle>
                    <div>
                        <Avatar alt={`${userData?.username} avatar`} src={userData?.avatar} />
                        <Typography>{userData?.username}</Typography>
                        <Typography>{userData?.fullname}</Typography>
                        <Typography>{userData?.about}</Typography>
                        <ul>
                            <li>
                                <a href={userData?.website}>{userData?.website}</a>
                            </li>
                            <li>{userData?.location}</li>
                            <li>2021г.</li>
                            <li>2004г.</li>
                        </ul>
                        {isRegister ? <Button style={{borderRadius: 30}} variant={"contained"} color={"primary"}>
                            <Link style={{color: "white"}} to={`/${id}/edit`}>
                                Редактировать
                            </Link>
                        </Button> : null}
                    </div>
                </div> : <Loader/>}
        </div>
    )
};

export default UserPage