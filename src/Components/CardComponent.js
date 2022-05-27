// ** React Imports
import { Fragment } from 'react'
// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button
} from 'reactstrap'
// ** Images
// import img1 from ''
// import img2 from '@src/assets/images/slider/02.jpg'
const CardContentTypes = ({ services }) => {
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center my-2">
                        <h1>Agency Tool</h1>
                    </div>
                </div>
                <div className="row">
                    {
                        services && services.map((service) => {
                            console.log(service)
                            return (
                                <div className="col-4" key={service.id}>
                                    <Card>
                                        <img top src={service.image} alt={service.name} />
                                        <CardBody>
                                            <CardTitle tag='h4'>{service.name}</CardTitle>
                                            <CardText>
                                                ${service.price_types.price}
                                            </CardText>
                                            <CardText>
                                                {service.description}
                                            </CardText>
                                            <Button color='primary' outline>
                                                Go Somewhere
                                            </Button>
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