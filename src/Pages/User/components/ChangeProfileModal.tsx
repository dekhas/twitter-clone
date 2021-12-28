import React from "react";
import ModalDialog from "../../../Components/ModalDialog";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {UserInterface, UserUpdateInterface} from "../../../redux/ducks/User/Contracts";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {selectUserLoadingState} from "../../../redux/selectors";
import {LoadingState} from "../../../types/loadingState";
import {setUserLoadingState} from "../../../redux/ducks/User/actionCreators";
import UserAPI from "../../../Services/api/userAPI";

interface ChangeProfileModalInterface {
    open: boolean,
    handleClose: () => void,
    handleChangeUserData: (data: UserInterface) => void,
}

export interface ChangeProfileForm extends UserUpdateInterface {}

const schema = yup.object().shape({
    avatar: yup.string().min(6, ""),
    location: yup.string().max(100, "Слишком длиная локация"),
    about: yup.string().max(150, "Слишком длинное описание"),
    website: yup.string().max(150, "Слишком длинная ссылка").url('Не является ссылкой'),
    birthday: yup.string().min(6, ""),
});

const ChangeProfileModal: React.FC<ChangeProfileModalInterface> = ({open, handleClose, handleChangeUserData}): React.ReactElement => {
    const dispatch = useDispatch();

    const loadingState = useSelector(selectUserLoadingState);

    const [openNotification, setOpenNotification] = React.useState<boolean>(false);

    const {control, handleSubmit, formState: {errors}} = useForm<ChangeProfileForm>({
        resolver: yupResolver(schema),
    });

    const handleCloseNotification = () => {
        setOpenNotification(false)
    };

    const onSubmit = async (data: ChangeProfileForm) => {
        try {
            dispatch(setUserLoadingState(LoadingState.LOADING));
            if (data.about === '') {
                delete data.about
            }
            if (data.website === '') {
                delete data.website
            }
            if (data.location === '') {
                delete data.location
            }
            const user = await UserAPI.updateUser(data);
            console.log(user);
            if (user) {
                handleChangeUserData(user);
            }
        } catch (e) {
            setOpenNotification(true);
        }
        dispatch(setUserLoadingState(LoadingState.LOADED))
    };

    return (
        <div>
            <ModalDialog title={'Редактировать профиль'} visible={open}
                         closeVisible={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name='location'
                        control={control}
                        render={({field: {onChange, value}}) => <TextField fullWidth
                                                                           id={"location"}
                                                                           label={"Локация"}
                                                                           type={"location"}
                                                                           variant={"filled"}
                                                                           error={!!errors.location}
                                                                           helperText={errors.location?.message}
                                                                           InputLabelProps={{shrink: true}}
                                                                           value={value}
                                                                           onChange={onChange}/>
                        }
                        defaultValue={''}
                    />
                    <br/>
                    <br/>
                    <Controller
                        name='about'
                        control={control}
                        render={({field: {onChange, value}}) => <TextField
                            fullWidth
                            id={"about"}
                            label={"Описание"}
                            type={"about"}
                            variant={"filled"}
                            error={!!errors.about}
                            helperText={errors.about?.message}
                            InputLabelProps={{shrink: true}}
                            value={value}
                            onChange={onChange}
                        />}
                        defaultValue={''}
                    />
                    <br/>
                    <br/>
                    <Controller
                        name='website'
                        control={control}
                        render={({field: {onChange, value}}) => <TextField
                            fullWidth
                            id={"website"}
                            label={"Веб-сайт"}
                            type={"website"}
                            variant={"filled"}
                            error={!!errors.website}
                            helperText={errors.website?.message}
                            InputLabelProps={{shrink: true}}
                            value={value}
                            onChange={onChange}
                        />}
                        defaultValue={''}
                    />
                    <DialogActions>
                        <Button disabled={loadingState === LoadingState.LOADING} type='submit' variant={"contained"} fullWidth>
                            Изменить
                        </Button>
                    </DialogActions>
                </form>
            </ModalDialog>
            <Snackbar open={openNotification} autoHideDuration={3000} onClose={handleCloseNotification}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Неверный логин или пароль
                </Alert>
            </Snackbar>
        </div>
    )
};

export default ChangeProfileModal