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
import { Link } from "react-router-dom"

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
        let link = `/login`;
        if (user) {
            if (user.roles[0].name === "Agency") {
                link = `/service-requests/create`
            } else {
                link = `/customer-service-requests/create/${id}`
            }
        }
        return link;
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
                            return (
                                <div className="col-4" key={service.id}>
                                    <Card>
                                        <div className='crd-dv-im'>
                                            <img src={image} className="crd-img" alt={service.name} />
                                        </div>
                                        <CardBody className='crd-hgt'>
                                            <CardTitle tag='h4'>{service.name}</CardTitle>
                                            <CardText>
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
                                            <CardText>
                                                {service.description}
                                            </CardText>
                                            <Link to={returnLink(service.id)}>
                                                <Button color='primary' outline>
                                                    Purchase
                                                </Button>
                                            </Link>
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
                    <div className="col-12 text-center">
                        Powered By <h1>{JSON.parse(localStorage.getItem("portal_settings"))?.agency?.name ?? 'Agency Tool'}</h1>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}
export default CardContentTypes