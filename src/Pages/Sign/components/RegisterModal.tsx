import React from "react"
import ModalDialog from "../../../Components/ModalDialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

interface RegisterModalProps {
    open: boolean,
    handleClose: () => void
}

const RegisterModal:React.FC<RegisterModalProps> = ({open, handleClose}): React.ReactElement => {
    return (
        <ModalDialog closeVisible={handleClose} title={"Регистрация"} visible={open}>
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
                <Button onClick={handleClose} variant={"contained"} fullWidth>
                    <NavLink to={"/home"} style={{textDecoration: "none", color: "white"}}>Зарегистроваться</NavLink>
                </Button>
                <Button onClick={handleClose} variant={"contained"} fullWidth>
                    Выход
                </Button>
            </DialogActions>
        </ModalDialog>
    )
};

export default RegisterModal;