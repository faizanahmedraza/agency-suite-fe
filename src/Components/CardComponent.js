// ** React Imports
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

const CardContentTypes = ({ services }) => {
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
            <div className="container">
                <header>
                    <div className="AGT-info">
                        {portal_settings.logo ?
                            <img src={portal_settings?.logo} height="50" /> : <h2>Hello</h2>}
                        <h1 className='pl'>{JSON.parse(localStorage.getItem("portal_settings"))?.agency?.name ?? ''}</h1>
                    </div>
                </header>
            </div>
            <div className="container main-cnt">
                <div className="row">
                    {
                        services && services.map((service) => {
                            const image = service.image ? service.image : "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"
                           let description = service.description.slice(0,100)
                            return (
                                <div className="col-4" key={service.id}>
                                    <Card>
                                        <div className='crd-dv-im'>
                                            <img src={image} className="crd-img" alt={service.name} />
                                        </div>
                                        <CardBody className='crd-hgt'>
                                            <CardTitle tag='h4'>{service.name}</CardTitle>
                                            <CardText className='crd-hgt-amnt'>
                                                {service.subscription_type === "recurring" ?
                                                    <Input type='select' name='subscription_type' id={`${service.id}`} onChange={handleOnChange}>
                                                        <option value="annualy">Annualy - ${Number.parseFloat(service.price_types.annually ?? 0).toFixed(2)}</option>
                                                        <option value="biannually">Biannually - ${Number.parseFloat(service.price_types.biannually ?? 0).toFixed(2)}</option>
                                                        <option value="quarterly">Quarterly - ${Number.parseFloat(service.price_types.quarterly ?? 0).toFixed(2)}</option>
                                                        <option value="weekly">Weekly - ${Number.parseFloat(service.price_types.weekly ?? 0).toFixed(2)}</option>
                                                        <option value="monthly">Monthly - ${Number.parseFloat(service.price_types.monthly ?? 0).toFixed(2)}</option>
                                                    </Input>
                                                    :
                                                    <>
                                                        $ {Number.parseFloat(service.price_types.price).toFixed(2)}
                                                    </>
                                                }
                                            </CardText>
                                            <CardText className='crd-hgt-desc'>
                                                {description}{service.description.length > 100? "..." : null}
                                            </CardText>
                                            <Button color='primary' outline onClick={() => returnLink(service.id)}>
                                                Purchase
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
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
export default CardContentTypes