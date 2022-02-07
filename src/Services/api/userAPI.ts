import {axios} from "../../core/axios";
import Response from "../../types/ResponseType";
import {UserInterface, UserUpdateInterface} from "../../redux/ducks/User/Contracts";
import {DialogsInterface} from "../../redux/ducks/Dialogs/Contracts";
import {Tweet} from "../../redux/ducks/Tweet/Contracts";

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
    },
    async getBookmarks() {
        const {data} = await axios.get<Response<Tweet[]>>(`/bookmark`);
        return data.data
    },
    async deleteBookmark(tweetID: string) {
        const {data} = await axios.delete<Response<null>>(`/bookmark/${tweetID}`);
        return data.data
    }
};

export default UserAPI