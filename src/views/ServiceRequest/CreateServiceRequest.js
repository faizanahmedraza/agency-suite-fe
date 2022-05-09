import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    Button,
    CardHeader,
    Spinner,
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import ServiceRequestCreateAction from "@store/V1/ServiceRequest/CREATE/ServiceRequestCreateAction";
import ServiceActions from '@store/V1/Service/List/ServiceListAction';
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import AsyncSelect from 'react-select/async';
import CustomerService from '@src/Services/V1/CustomerService';
import AgencyService from '@src/Services/V1/AgencyService';

const CreateServiceRequest = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        service: { list: { services, loading: serviceLoading } = [] } = [],
        customers: { list: { customers, loading: customerLoading } = [] } = [],
        service_requests: { create: { loading } } = {}
    } = useSelector(state => state);

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        customer_id: "",
        recurring_type: "",
        title: "",
        description: "",
        is_recurring: false,
        selected_service: null,
    })

    const [inputCustomerValue, setCustomerValue] = useState('');
    const [inputServiceValue, setServiceValue] = useState('');
    const [defaultCustomerOptions, setDefaultCustomerOptions] = useState([]);
    const [defaultServiceOptions, setDefaultServiceOptions] = useState([]);

    useEffect(() => {
        dispatch(ServiceActions.serviceList());
        dispatch(CustomerListAction.customerList());
        loadDefaultOptions();
    }, []);

    const handleInputField = (e) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            [e.target.name]: e.target.value
        })
    }

    // handle customer input change event
    const handleCustomerInputChange = (inputValue, { action }) => {
        if (action === "input-change") {
            setCustomerValue(inputValue);
        }
        if (action === "menu-close") {
            loadDefaultOptions();
        }
    };

    // handle service input change event
    const handleServiceInputChange = (inputValue, { action }) => {
        if (action === "input-change") {
            setServiceValue(inputValue);
        }
        if (action === "menu-close") {
            loadDefaultOptions();
        }
    };

    // handle on change async selection
    const handleOnChange = (options, e) => {
        if (e.name == "customers") {
            serviceRequestDetails.customer_id = options.value;
        } else {
            serviceRequestDetails.service_id = options.value;
            serviceRequestDetails.selected_service = services.find(service => service.id === Number(options.value));
            serviceRequestDetails.is_recurring = serviceRequestDetails.selected_service?.subscription_type == "recurring" ? true : false;
        }
        setServiceRequestDetails({
            ...serviceRequestDetails
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(ServiceRequestCreateAction.serviceRequestCreate(serviceRequestDetails));
    }

    const smartCustomerSearchFilter = async (inputValue) => {
        if (inputValue.length > 2 && inputValue.trim()) {
            const response = await CustomerService.customerSearch({
                field: "first_name",
                value: inputValue,
            });
            return response.data.customers;
        }
    }

    const smartServiceSearchFilter = async (inputValue) => {
        if (inputValue.length > 2 && inputValue.trim()) {
            const response = await AgencyService.serviceSearch({
                field: "name",
                value: inputValue,
            });
            return response.data.services;
        }
    }

    const loadCustomerOptions = async (inputValue, callback) => {
        let data = await smartCustomerSearchFilter(inputValue);
        const result = data.map((d) => {
            return {
                value: `${d.id}`,
                label: `${d.first_name + ' ' + d.last_name}`,
            };
        });
        callback(result);
    };

    const loadServiceOptions = async (inputValue, callback) => {
        let data = await smartServiceSearchFilter(inputValue);
        const result = data.map((d) => {
            return {
                value: `${d.id}`,
                label: `${d.name}`,
            };
        });
        callback(result);
    };

    const loadDefaultOptions = () => {
        const resultCustomer = customers.slice(0, 20).map((d) => {
            return {
                value: `${d.id}`,
                label: `${d.first_name + ' ' + d.last_name}`,
            };
        });
        const resultService = services.slice(0, 20).map((d) => {
            return {
                value: `${d.id}`,
                label: `${d.name}`,
            };
        });
        setDefaultCustomerOptions(resultCustomer)
        setDefaultServiceOptions(resultService)
    };

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Create Service Request</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Card>
                        <CardHeader>
                            <h4>Service Request Details</h4>
                        </CardHeader>
                        <hr />
                        <CardBody>
                            <Form onSubmit={onSubmitHandler}>
                                <Row>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Customer
                                            </Label>
                                            <AsyncSelect
                                                isClearable={false}
                                                cacheOptions
                                                defaultOptions={defaultCustomerOptions}
                                                className='react-select'
                                                classNamePrefix='select'
                                                name="customers"
                                                loadOptions={loadCustomerOptions}
                                                onInputChange={handleCustomerInputChange}
                                                onChange={(options, e) => handleOnChange(options, e)}
                                            />
                                        </div>
                                    </Col>
                                    <Col md="6" sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='select-basic'>
                                                Service
                                            </Label>
                                            <AsyncSelect
                                                isClearable={false}
                                                cacheOptions
                                                defaultOptions={defaultServiceOptions}
                                                className='react-select'
                                                classNamePrefix='select'
                                                name="services"
                                                loadOptions={loadServiceOptions}
                                                onInputChange={handleServiceInputChange}
                                                onChange={(options, e) => handleOnChange(options, e)}
                                            />
                                        </div>
                                    </Col>
                                    {
                                        serviceRequestDetails.is_recurring && serviceRequestDetails.selected_service != null ?
                                            (
                                                <Col md='12' sm='12'>
                                                    <div className='mb-1'>
                                                        <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                            Service Subscription
                                                        </Label>
                                                        <div className='demo-inline-spacing'>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' value="annualy" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr1'>
                                                                    {'annualy - ' + serviceRequestDetails.selected_service.price_types.annually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' value="biannually" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr2'>
                                                                    {'biannually - ' + serviceRequestDetails.selected_service.price_types.biannually + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' value="quarterly" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr3'>
                                                                    {'quarterly - ' + serviceRequestDetails.selected_service.price_types.quarterly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' value="weekly" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr4'>
                                                                    {'weekly - ' + serviceRequestDetails.selected_service.price_types.weekly + '$'}
                                                                </Label>
                                                            </div>
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' value="monthly" onChange={handleInputField} defaultChecked />
                                                                <Label className='form-check-label' for='sr5'>
                                                                    {'monthly - ' + serviceRequestDetails.selected_service.price_types.monthly + '$'}
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ) : ""
                                    }
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Title
                                            </Label>
                                            <Input type='text' value={serviceRequestDetails.title} onChange={handleInputField} name='title' id='title' placeholder='Enter Title' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Description
                                            </Label>
                                            <Input type='textarea' value={serviceRequestDetails.description} onChange={handleInputField} name='description' id='description' placeholder='Enter Description' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='d-flex justify-content-between'>
                                            <Button outline className='me-1' color='secondary' type='button' onClick={() => navigate(-1)}>
                                                Cancel
                                            </Button>
                                            <Button color='primary' type='submit' disabled={loading}>
                                                {
                                                    loading ?
                                                        <>
                                                            <Spinner color='white' size='sm' type='grow' />
                                                            <span className='ms-50'>Loading...</span>
                                                        </>
                                                        :
                                                        <span>
                                                            Create
                                                        </span>
                                                }
                                            </Button>

                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </CardBody>
            </Card >

        </div >
    )
}

export default CreateServiceRequest;