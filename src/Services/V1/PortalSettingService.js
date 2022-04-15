import Gateway from "@src/Gateways/Gateway";
import V1 from "@src/Constants/V1ApiConstant";

async function portalSettingGet() {
    const response = await Gateway.guestGateway(
        "GET",
        V1.DOMAIN,
        `${V1.agency.portal_settings.get}`
    );
    return response;
}

async function portalSettingPut(data) {
    const response = await Gateway.authGateway(
        "PUT",
        V1.DOMAIN,
        `${V1.agency.portal_settings.put}`,
        portalSettingBodyData(data)
    );
    return response;
}

const portalSettingBodyData = (data) => {
    let _data = {};
    _data.name = data.name;
    _data.logo = data.logo;
    _data.favicon = data.favicon;
    _data.primary_color = data.primary_color;
    _data.secondary_color = data.secondary_color;
    return JSON.stringify(_data);
}

const PortalSettingService = {
    portalSettingGet,
    portalSettingPut,
}

export default PortalSettingService;