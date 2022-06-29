import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from '@store/store'
import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
import '@src/Styles/serviceDetails.css'
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
import ipad from "@src/assets/images/elements/ipad-pro.png"

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
            {/* ==========header========= */}
            <header>
                <div className="AGT-info">
                    {portal_settings.logo ?
                        <img src={portal_settings?.logo} height="50" /> : <h2>Hello</h2>}
                        <h1 className='pl'>{JSON.parse(localStorage.getItem("portal_settings"))?.agency?.name ?? ''}</h1>
                    </div>  
            </header>

            {/* =======Body======== */}
            <div className="container">
                <Card className='pad-alf'>
                    <div className="row">
                        <div className="col-4">
                            <img src={ipad} alt="" />
                        </div>
                    </div>
                    <hr/> <br/>
                    <div className="row">
                        <div className="col-4">
                           <h2>   Service Name : </h2> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 offset-1">
                          <h4>  Web Development </h4> 
                        </div>
                    </div>
                    <hr/> <br/>
                    <div className="row">
                        <div className="col-4">
                           <h2>   Payment : </h2> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 offset-1">
                          <h4>  Recurring </h4> 
                        </div>
                    </div>
                    <hr/> <br/>
                    <div className="row">
                        <div className="col-4">
                           <h2>   Description : </h2> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 offset-1">
                          <h4>  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, similique molestias iure beatae aperiam est, ipsa earum debitis architecto, recusandae cumque perspiciatis error porro officia quis asperiores sed commodi aut. </h4> 
                        </div>
                    </div>
                    <hr/> <br/>
                    <div className="row">
                        <div className="col-12 text-end">
                          <Button> Purchase </Button>
                        </div>
                    </div>
                </Card>
            </div>
            {/* ========footer=========== */}
            <footer>
                <div className="row">
                    <p className='clearfix mb-0 text-center'>
                        <span className='my-25'>
                            COPYRIGHT © {new Date().getFullYear()}{' '} Powered By <span className="ft-ag-clr"> Agency Suite </span>
                        </span>
                    </p>
                </div>
            </footer>
        </Fragment>
    )
}
export default CardDetails