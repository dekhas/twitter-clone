import {axios} from "../../core/axios";
import Response from "../../types/ResponseType";
import {UserInterface} from "../../redux/ducks/User/Contracts";

const UserAPI = {
    async getUser(payload: string) {
        const {data} = await axios.get<Response<UserInterface>>(`/users/${payload}`);
        return data.data
    }
};

export default UserAPI