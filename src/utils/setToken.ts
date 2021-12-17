const setToken = (token: string | undefined | null): void => {
    if (token != null) {
        window.localStorage.setItem('token', token);
    }
};

export default setToken;