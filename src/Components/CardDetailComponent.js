import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from '@store/store'
import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
import '@src/Styles/card.css'
// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button,
    Input
} from 'reactstrap'
import GeneralHelper from "@src/Helpers/GeneralHelper";

const CardDetails = ({ services }) => {
    const dispatch = useDispatch()
    const {
        portal_settings: { detail: { portal_settings, fetched } },
    } = useSelector((state => state))

    useEffect(() => {
        if (!fetched) return dispatch(PortalSettingDetailAction.portalSettingDetail());
    }, [fetched]);


    const handleOnChange = e => {
        //
    }

    function returnLink(id) {
        const user = JSON.parse(localStorage.getItem("user"));
        let link = "/login";
        if (user) {
            if (user.roles[0].name === "Agency") {
                let serviceId = GeneralHelper.Serialize({
                    service_id: id
                })
                link = "/service-requests/create?"+serviceId
            } else {
                link = "/customer-service-requests/create/"+id
            }
        }
        window.location.href = link;
        
    }
    return (
        <Fragment>
            <header>
                <div className="AGT-info">
                    {portal_settings.logo ?
                        <img src={portal_settings?.logo} height="50" /> : <h2>Hello</h2>}
                        <h1 className='pl'>{JSON.parse(localStorage.getItem("portal_settings"))?.agency?.name ?? ''}</h1>
                    </div>
                    
            </header>
        </Fragment>
    )
}
export default CardDetails