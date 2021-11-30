import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

interface ModalProps {
    title: string,
    children: React.ReactNode,
    visible: boolean,
    closeVisible: () => void,
}

const ModalDialog: React.FC<ModalProps> = ({children, title, visible = false, closeVisible}): React.ReactElement | null => {

    if (!visible) {
        return null
    }

    return (
        <Dialog open={visible} onClose={closeVisible} maxWidth={"sm"} fullWidth={true}>
            <DialogTitle>
                <IconButton onClick={closeVisible} >
                    <CloseIcon color={"primary"}/>
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
};

export default ModalDialog;