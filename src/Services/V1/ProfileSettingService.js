import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function profileSettingGet() {
    const response = await Gateway.authGateway(
        "GET",
        V1.DOMAIN,
        `${V1.agency.profile_settings}`
    );
    return response;
}

async function profileSettingPut(data) {
    const response = await Gateway.authGateway(
        "PUT",
        V1.DOMAIN,
        `${V1.agency.profile_settings}`,
        profileSettingBodyData(data)
    );
    return response;
}

const profileSettingBodyData = (data) => {
    let _data = {};
    _data.name = data.name;
    _data.image = data.image;
    return JSON.stringify(_data);
}

const ProfileSettingService = {
    profileSettingGet,
    profileSettingPut,
}

export default ProfileSettingService;