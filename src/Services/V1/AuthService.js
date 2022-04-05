import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";


async function loginPost(data) {
    const _data = LoginPostBody(data);
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.login, _data);
    return response;
}

async function registerPost(data) {
    const _data = RegisterPostBody(data);

    console.log(_data)
    const response = await Gateway.guestGateway("POST", null, V1.auth.register, _data);
    return response;
}

async function verificationPost(data) {
    
    const _data = VerificationPostBody(data);
    console.log(_data)
    const response = await Gateway.guestGateway("POST", V1.DOMAIN, V1.auth.verification, _data);
    return response;
}

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
const VerificationPostBody = (data) => {
    let _data = {};
    _data.password = data.password;
    _data.password_confirmation = data.password_confirmation;
    _data.token = data.token;
    return JSON.stringify(_data);
};

const AuthService = {
    loginPost,
    registerPost,
    verificationPost
};
export default AuthService;
