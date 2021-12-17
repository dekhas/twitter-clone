import React, {useEffect} from "react"
import ModalDialog from "../../../Components/ModalDialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import * as yup from "yup"
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {selectUserLoadingState} from "../../../redux/selectors";
import {LoadingState} from "../../../types/loadingState";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {registerUser} from "../../../redux/ducks/User/actionCreators";

interface RegisterModalProps {
    open: boolean,
    handleClose: () => void
}

export interface RegisterForm {
    username: string,
    fullname: string,
    email: string,
    password: string,
    password2: string,
}

const schema = yup.object().shape({
    username: yup.string().min(2, 'Слишком коротко').required('Введите логин'),
    fullname: yup.string().min(2, 'Слишком коротко').required('Введите имя'),
    email: yup.string().email("Неверная почта").required('Введите почту'),
    password: yup.string().min(6, 'Слишком коротко').required('Введите пароль'),
    password2: yup.string().min(6, 'Слишком коротко').required('Повторите пароль'),
}).required();

const RegisterModal: React.FC<RegisterModalProps> = ({open, handleClose}): React.ReactElement => {

    const history = useHistory();

    const [openNotification, setOpenNotification] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');

    const {control, handleSubmit, formState: {errors}} = useForm<RegisterForm>({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    const loadingState = useSelector(selectUserLoadingState);

    useEffect(() => {
        if (loadingState === LoadingState.ERROR) {
            setOpenNotification(true)
        } else if (loadingState === LoadingState.LOADED) {
            history.push('/home')
        }
        // eslint-disable-next-line
    }, [loadingState]);

    console.log(errors);

    const onSubmit = (data: RegisterForm) => {
        if (data.password !== data.password2) {
            setMessage('Пароли не совпадают');
            setOpenNotification(true);
            return
        }
        try {
            dispatch(registerUser(data))
        } catch (e) {
            setOpenNotification(true);
            setMessage('Ошибка сервера')
        }
    };

    const handleCloseNotification = () => {
        setOpenNotification(false)
    };


    return (
        <div>
            <ModalDialog closeVisible={handleClose} title={"Регистрация"} visible={open}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={'fullname'}
                        control={control}
                        render={({field: {onChange, value}}) => <TextField
                            fullWidth
                            id={"fullname"}
                            label={"Имя"}
                            type={"fullname"}
                            variant={"filled"}
                            error={!!errors.fullname}
                            helperText={errors.fullname?.message}
                            InputLabelProps={{shrink: true}}
                            value={value}
                            onChange={onChange}
                        />}
                    />
                    <br/>
                    <br/>
                    <Controller
                        name={'username'}
                        control={control}
                        render={({field: {onChange, value}}) => <TextField
                            fullWidth
                            id={"username"}
                            label={"Никнейм"}
                            type={"username"}
                            variant={"filled"}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            InputLabelProps={{shrink: true}}
                            value={value}
                            onChange={onChange}
                        />}
                    />
                    <br/>
                    <br/>
                    <Controller
                        name='email'
                        control={control}
                        render={({field: {onChange, value}}) => <TextField fullWidth
                                                                           id={"email"}
                                                                           label={"Почта"}
                                                                           type={"email"}
                                                                           variant={"filled"}
                                                                           error={!!errors.email}
                                                                           helperText={errors.email?.message}
                                                                           InputLabelProps={{shrink: true}}
                                                                           value={value}
                                                                           onChange={onChange}/>
                        }
                        defaultValue={''}
                    />
                    <br/>
                    <br/>
                    <Controller
                        name='password'
                        control={control}
                        render={({field: {onChange, value}}) => <TextField
                            fullWidth
                            id={"password"}
                            label={"Пароль"}
                            type={"password"}
                            variant={"filled"}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputLabelProps={{shrink: true}}
                            value={value}
                            onChange={onChange}
                        />}
                        defaultValue={''}
                    />
                    <br/>
                    <br/>
                    <Controller
                        name='password2'
                        control={control}
                        render={({field: {onChange, value}}) => <TextField
                            fullWidth
                            id={"password2"}
                            label={"Повторите пароль"}
                            type={"password2"}
                            variant={"filled"}
                            error={!!errors.password2}
                            helperText={errors.password2?.message}
                            InputLabelProps={{shrink: true}}
                            value={value}
                            onChange={onChange}
                        />}
                        defaultValue={''}
                    />
                    <DialogActions>
                        <Button disabled={loadingState === LoadingState.LOADING} type={'submit'} variant={"contained"} fullWidth>
                            Зарегистроваться
                        </Button>
                    </DialogActions>
                </form>
            </ModalDialog>
            <Snackbar open={openNotification} autoHideDuration={3000} onClose={handleCloseNotification}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
};

export default RegisterModal;