import {axios} from "../../core/axios";
import {LoginForm} from "../../Pages/Sign/components/LoginModal";
import Response from "../../types/ResponseType";

export const AuthAPI = {
    login(postData: LoginForm) {
        return axios.post<Response<LoginForm>>('auth/login', {username: postData.email, password: postData.password}).then(({data}) => data.data)
    }
};


//"https://trycode.pw/c/2OBQ1.json"