import config from '@src/configs/Config';
import { store } from '@store/store';
import LogoutHelper from '@src/Helpers/LogoutHelper';

async function authGateway(METHOD, API, BODY = null) {
    const URL = `${config.base_url}${API}`;
    const TOKEN = store.getState().login.token;
    const OPTIONS = {
        method: METHOD,
        headers: {
            'access-control-allow-origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: BODY,
    };
    return await fetch(URL, OPTIONS)
        .then(handleResponse)
        .then((response) => {
            if (response.success !== true) {
                if (response.error.code === 'BIOWP-401') {
                    LogoutHelper.logout();
                } else if (response.error.code === 'BIOWP-404') {
                    // window.location.href = "/404";
                } else if (response.error.code === 'BIOWP-403') {
                    window.location.href = '/403';
                }
            } else {
                localStorage.setItem(
                    'permissions',
                    JSON.stringify(response.data.permissions)
                );
            }
            return response;
        });
}

async function guestGateway(METHOD, DOMAIN = null, API, BODY = null) {
    const URL = `${config.base_url}${API}`;
    const OPTIONS = {
        method: METHOD,
        headers: {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
            "Domain": DOMAIN ? DOMAIN : "",
            'Client-ID': config.client_id,
            'Client-Secret': config.client_secret,
        },
        body: BODY,
    };
    return await fetch(URL, OPTIONS)
        .then(handleResponse)
        .then((response) => {
            if (response.success !== true) {
                //error handling
            }
            return response;
        });
}

async function thirdPartyGateway(METHOD, API) {
    const URL = API;
    const OPTIONS = {
        method: METHOD,
    };
    return await fetch(URL, OPTIONS)
        .then(handleResponse)
        .then((response) => {
            if (response.success !== true) {
                //error handling
            }
            return response;
        });
}

function handleResponse(response) {
    return response.text().then((text) => {
        return text && JSON.parse(text);
    });
}
const Gateway = {
    guestGateway,
    authGateway,
    thirdPartyGateway,
};
export default Gateway;