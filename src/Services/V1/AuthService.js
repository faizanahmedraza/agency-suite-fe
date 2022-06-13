import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function launchPost(data) {
    const _data = LaunchPostBody(data);
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.launch, _data);
    return response;
}

async function loginPost(data) {
    const _data = LoginPostBody(data);
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.login, _data);
    return response;
}

async function logoutDelete() {
    const response = await Gateway.authGateway("DELETE", V1.DOMAIN,V1.auth.logout);
    return response;
}

async function registerPost(data) {
    const _data = RegisterPostBody(data);
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.register, _data);
    return response;
}

async function customerRegisterPost(data) {
    const _data = CustomerRegisterPostBody(data);
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.customer_register, _data);
    return response;
}

async function verificationPost(data) {
    const _data = VerificationPostBody(data);
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.verification, _data);
    return response;
}

async function forgotPasswordPost(data) {
    const _data = forgotPasswordPostBody(data);
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.forgot_password, _data);
    return response;
}

const LaunchPostBody = (data) => {
    let _data = {};
    _data.domain = data.domain;
    return JSON.stringify(_data);
};
const LoginPostBody = (data) => {
    let _data = {};
    _data.email = data.email;
    _data.password = data.password;
    return JSON.stringify(_data);
};
const RegisterPostBody = (data) => {
    let _data = {};
    _data.agency_name = data.agency_name;
    _data.email = data.email;
    return JSON.stringify(_data);
};
const CustomerRegisterPostBody = (data) => {
    let _data = {};
    _data.first_name = data.first_name;
    _data.last_name = data.last_name;
    _data.email = data.email;
    return JSON.stringify(_data);
};
const VerificationPostBody = (data) => {
    let _data = {};
    _data.password = data.password;
    _data.password_confirmation = data.password_confirmation;
    _data.token = data.token;
    return JSON.stringify(_data);
};
const forgotPasswordPostBody = (data) => {
    let _data = {};
    _data.email = data.email;
    return JSON.stringify(_data);
};

const AuthService = {
    loginPost,
    logoutDelete,
    registerPost,
    verificationPost,
    forgotPasswordPost,
    customerRegisterPost,
    launchPost
};
export default AuthService;
