import React, {useState} from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import style from "./../style.module.css"
import {Button} from "@mui/material";
import {MessagesInterface} from "../../../redux/ducks/Dialogs/Contracts";
import {io} from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {addMessage} from "../../../redux/ducks/Dialogs/actionCreators";
import {selectUserData} from "../../../redux/selectors";

const socket = io();



interface UserDialogProps {
    messages: MessagesInterface[],
    userID?: string,
    activeIndex: number,
}

const UserDialog: React.FC<UserDialogProps> = ({messages, userID, activeIndex,}): React.ReactElement => {
    const [message, setMessage] = useState<string>('');

    const dispatch = useDispatch();
    const user = useSelector(selectUserData);

    React.useEffect(() => {
        socket.emit('initialize conversations', user?.conversations);
    }, []);

    console.log(messages);

    const handleChangeMessage = (e: React.FormEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget) {
            setMessage(e.currentTarget.value);
        }
    };

    socket.on('set conversation message', (data: MessagesInterface) => {
        dispatch(addMessage(data, activeIndex))
    });

    const handleSubmitMessage = () => {
        const data = {
            user: userID,
            message: message,
            // @ts-ignore
            conversation: user?.conversations[activeIndex],
        };
        dispatch(addMessage(data, activeIndex));
        setMessage('');
        // @ts-ignore
        socket.emit('send private message', message, userID, user?.conversations[activeIndex], );
    };

    return (
        <div>
            <div className={style.messages}>
                {messages ? messages.map((item, index) => {
                    return <div className={item.user === userID ? style.your_message_box : style.someone_message_box} key={`${item}_${index}`}>
                        <span className={item.user === userID ? style.your_message : style.someone_message}>{item.message}</span>
                    </div>
                }) : null}
            </div>
            <div className={style.send_message_input}>
                <TextareaAutosize maxRows={12} value={message} onChange={handleChangeMessage}
                                  placeholder={"Напишите сообщение"}/>
                <Button onClick={handleSubmitMessage} disabled={!message}>Отправить</Button>
            </div>
        </div>
    )
};

export default UserDialog