import LogoutHelper from "./LogoutHelper";

const localData = (token) => {
    try {
        return JSON.parse(token);
    } catch (e) {
        LogoutHelper.logout();
    }
};

const LoginHelper = {
    localData,
};

export default LoginHelper;
