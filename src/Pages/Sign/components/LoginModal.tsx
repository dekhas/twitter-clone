import React, {useEffect} from "react";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import ModalDialog from "../../../Components/ModalDialog";
import * as yup from "yup"
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useDispatch, useSelector} from "react-redux";
import {selectUserLoadingState} from "../../../redux/selectors";
import {LoadingState} from "../../../types/loadingState";
import {fetchUser} from "../../../redux/ducks/User/actionCreators";

interface LoginModalProps {
    open: boolean,
    handleClose: () => void
}

export interface LoginForm {
    email: string,
    password: string,
}

const schema = yup.object().shape({
    email: yup.string().email("Неверная почта").required("Необходимо ввести почту"),
    password: yup.string().min(6, "Слишком короткий пароль").required("Необходимо ввести пароль")
}).required();

const LoginModal: React.FC<LoginModalProps> = ({open, handleClose}): React.ReactElement => {
    const history = useHistory();

    const [openNotification, setOpenNotification] = React.useState<boolean>(false);

    const {control, handleSubmit, formState: {errors}} = useForm<LoginForm>({
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

    const onSubmit = async (data: LoginForm) => {
        dispatch(fetchUser(data))
    };

    const handleCloseNotification = () => {
        setOpenNotification(false)
    };

    return (
        <div>
            <ModalDialog closeVisible={handleClose} title={"Войти"} visible={open}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <DialogActions>
                        <Button disabled={loadingState === LoadingState.LOADING} type='submit' variant={"contained"} fullWidth>
                            Войти
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

export default LoginModal;