// ** React Imports
import { Fragment, useState } from 'react'
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

    const [serviceType,setServiceType] = useState("");

    const handleOnChange = e => {
        setServiceType(e.target.value);
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center my-2">
                        <h1>{JSON.parse(localStorage.getItem("portal_settings"))?.agency?.name ?? 'Agency Tool'}</h1>
                    </div>
                </div>
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
                                        <CardBody>
                                            <CardTitle tag='h4'>{service.name}</CardTitle>
                                            <CardText>
                                                {service.subscription_type === "recurring" ?
                                                    <Input type='select' value={serviceType} name='subscription_type' id='select-basic' onChange={handleOnChange}>
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
                                            <Link to="/register">
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
                <div className="row">
                    <div className="col-12 text-center">
                        Powered By <a href="#"> Agency Tool </a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CardContentTypes