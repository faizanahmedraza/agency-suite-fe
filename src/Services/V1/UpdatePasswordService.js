import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function passwordUpdatePut(data) {
    const response = await Gateway.authGateway(
        "PUT",
        V1.DOMAIN,
        `${V1.change_auth_password}`,
        passwordUpdateBodyData(data)
    );
    return response;
}

const passwordUpdateBodyData = (data) => {
    let _data = {};
    _data.old_password = data.old_password;
    _data.password = data.password;
    _data.password_confirmation = data.password_confirmation;
    return JSON.stringify(_data);
}

const UpdatePasswordService = {
    passwordUpdatePut,
}

export default UpdatePasswordService;