import {axios} from "../../core/axios";
import Response from "../../types/ResponseType";
import {UserInterface, UserUpdateInterface} from "../../redux/ducks/User/Contracts";
import {DialogsInterface} from "../../redux/ducks/Dialogs/Contracts";

const UserAPI = {
    async getUser(payload: string) {
        const {data} = await axios.get<Response<UserInterface>>(`/users/${payload}`);
        return data.data
    },
    async updateUser(userUpdateData: UserUpdateInterface) {
        const data = {...userUpdateData};
        console.log(data);
        return axios.patch<Response<UserInterface>>('/user', data).then(({data}) => data.data)
    },
    async getConversations() {
        const {data} = await axios.get<Response<DialogsInterface['data']>>(`/user/conversations`);
        return data.data
    }
};

export default UserAPI