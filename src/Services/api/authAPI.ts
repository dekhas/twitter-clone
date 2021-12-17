import {axios} from "../../core/axios";
import {LoginForm} from "../../Pages/Sign/components/LoginModal";
import Response from "../../types/ResponseType";
import {UserInterface} from "../../redux/ducks/User/Contracts";
import {RegisterForm} from "../../Pages/Sign/components/RegisterModal";

export const AuthAPI = {
    login(postData: LoginForm) {
        return axios.post<Response<LoginForm>>('auth/login', {username: postData.email, password: postData.password}).then(({data}) => data.data)
    },
    authMe() {
        return axios.get<Response<UserInterface>>("auth/me").then(({data}) => data.data)
    },
    register(postData: RegisterForm) {
        return axios.post<Response<RegisterForm>>("auth/register", postData).then(({data}) => data.data)
    }
};


//"https://trycode.pw/c/2OBQ1.json"