import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { EditorState,convertToRaw  } from 'draft-js';
import EditorComponent from "@src/Components/EditorComponent";
import {
    Card,
    Row,
    Col,
    Label,
    Input,
    CardBody,
    Form,
    Button,
    Spinner,
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import ServiceRequestCreateAction from "@store/V1/ServiceRequest/CREATE/ServiceRequestCreateAction";
import ServiceActions from '@store/V1/Service/List/ServiceListAction';
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import AsyncSelect from 'react-select/async';
import CustomerService from '@src/Services/V1/CustomerService';
import AgencyService from '@src/Services/V1/AgencyService';
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Loader = () => {
    return (
        <div className='d-flex justify-content-center'><strong>Loading...</strong></div>
    );
}

const CreateServiceRequest = () => {

    const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useSearchParams()
    const serviceId = searchParam.get("service_id")

    const {
        service: { list: { services, loading: serviceLoading } },
        customers: { list: { customers, loading: customerLoading } },
        service_requests: { create: { loading } }
    } = useSelector(state => state);

    const requiredService = (!serviceLoading && serviceId !== null) ? services.find(({ id }) => id === Number(serviceId)) : null;

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        service_id: "",
        customer_id: "",
        recurring_type: "monthly",
        title: "",
        description: "",
        is_recurring: false,
        selected_service: null,
        quantity: 1
    })

    const [inputCustomerValue, setCustomerValue] = useState('');
    const [inputServiceValue, setServiceValue] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const resultDefaultCustomer = customers.slice(0, 20).map((d) => {
        return {
            value: `${d.id}`,
            label: `${d.first_name + ' ' + d.last_name}`,
        };
    });
    const resultDefaultService = services.slice(0, 20).map((d) => {
        return {
            value: `${d.id}`,
            label: `${d.name}`,
        };
    });

    useEffect(() => {
        if (!services.length) {
            dispatch(ServiceActions.serviceList(GeneralHelper.Serialize({
                status: "active,pending"
            })));
        }
        if (!customers.length) {
            dispatch(CustomerListAction.customerList(GeneralHelper.Serialize({
                status: "active,pending"
            })));
        }
        if (requiredService) {
            setServiceRequestDetails({
                ...serviceRequestDetails,
                service_id: requiredService?.id ?? "",
                recurring_type: "monthly",
                is_recurring: requiredService?.subscription_type == "recurring" ? true : false,
                selected_service: requiredService,
            })
        }
    }, [requiredService]);

    const descriptionSaveContent = (content) => {
        setServiceRequestDetails({
            ...serviceRequestDetails,
            description: JSON.stringify(convertToRaw(content)),
        });
    }

    const onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        descriptionSaveContent(contentState);
        setEditorState(editorState);
    };

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
    };

    // handle service input change event
    const handleServiceInputChange = (inputValue, { action }) => {
        if (action === "input-change") {
            setServiceValue(inputValue);
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
            const response = await CustomerService.customerList(GeneralHelper.Serialize({
                full_name: inputValue,
                status: "active,pending"
            }));
            return response.data.customers;
        }
    }

    const smartServiceSearchFilter = async (inputValue) => {
        if (inputValue.length > 2 && inputValue.trim()) {
            const response = await AgencyService.serviceList(GeneralHelper.Serialize({
                name: inputValue,
                status: "active,pending"
            }));
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

    const defaulServicetValue = {
        value: requiredService?.id ?? "Select...",
        label: requiredService?.name ?? "Select...",
    }

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
                    {
                        (serviceLoading || customerLoading) ? <Loader /> :
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
                                                defaultOptions={resultDefaultCustomer}
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
                                                defaultValue={defaulServicetValue}
                                                defaultOptions={resultDefaultService}
                                                className='react-select'
                                                classNamePrefix='select'
                                                name="services"
                                                loadOptions={loadServiceOptions}
                                                onInputChange={handleServiceInputChange}
                                                onChange={(options, e) => handleOnChange(options, e)}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {
                                    (serviceRequestDetails.is_recurring && serviceRequestDetails.selected_service != null) &&
                                    <Row>
                                        <Col md='12' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                    Service Subscription
                                                </Label>
                                                <div className='demo-inline-spacing'>
                                                    {serviceRequestDetails.selected_service.price_types.weekly ?
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' value="weekly" onChange={handleInputField} />
                                                            <Label className='form-check-label' for='sr4'>
                                                                {'weekly - $' + Number.parseFloat(serviceRequestDetails.selected_service.price_types.weekly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        : ""
                                                    }
                                                    {serviceRequestDetails.selected_service.price_types.monthly ?
                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr5' value="monthly" onChange={handleInputField} defaultChecked />
                                                            <Label className='form-check-label' for='sr5'>
                                                                {'monthly - $' + Number.parseFloat(serviceRequestDetails.selected_service.price_types.monthly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        : ""
                                                    }
                                                    {serviceRequestDetails.selected_service.price_types.quarterly ?

                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr3' value="quarterly" onChange={handleInputField} />
                                                            <Label className='form-check-label' for='sr3'>
                                                                {'quarterly - $' + Number.parseFloat(serviceRequestDetails.selected_service.price_types.quarterly).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        : ""
                                                    }
                                                    {serviceRequestDetails.selected_service.price_types.biannually ?

                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr2' value="biannually" onChange={handleInputField} />
                                                            <Label className='form-check-label' for='sr2'>
                                                                {'biannually - $' + Number.parseFloat(serviceRequestDetails.selected_service.price_types.biannually).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        : ""
                                                    }
                                                    {serviceRequestDetails.selected_service.price_types.annually ?

                                                        <div className='form-check'>
                                                            <Input type='radio' name='recurring_type' id='sr1' value="annually" onChange={handleInputField} />
                                                            <Label className='form-check-label' for='sr1'>
                                                                {'annually - $' + Number.parseFloat(serviceRequestDetails.selected_service.price_types.annually).toFixed(2)}
                                                            </Label>
                                                        </div>
                                                        : ""
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                }
                                {
                                    (!serviceRequestDetails.is_recurring && serviceRequestDetails.selected_service !== null) &&
                                    <Row>
                                        <Col md='4' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
                                                    Subscription Type
                                                </Label>
                                                <p className='text-wrap'>
                                                    one-off
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md='4' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
                                                    Price
                                                </Label>
                                                <p className='text-wrap'>
                                                    ${Number.parseFloat(serviceRequestDetails?.selected_service?.price_types?.price ?? 0).toFixed(2)}
                                                </p>
                                            </div>
                                        </Col>
                                        <Col md='4' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label fs-5' for='select-basic'>
                                                    Purchase Limit
                                                </Label>
                                                <p className='text-wrap'>
                                                    {serviceRequestDetails?.selected_service?.price_types?.purchase_limit ?? "---"}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                }
                                <Row>
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
                                            <div>
                                                <EditorComponent
                                                
                                                    editorState={editorState}
                                                    onEditorStateChange={onEditorStateChange}
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='select-basic'>
                                                Quantity
                                            </Label>
                                            <Input type='number' value={serviceRequestDetails.quantity} onChange={handleInputField} name='quantity' id='quantity' placeholder='Enter Quantity (Minimum 1)' min={1}/>
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='d-flex justify-content-between'>
                                            <Link to="/service-requests" className='btn btn-outline-secondary'>
                                                Cancel
                                            </Link>
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
                    }
                </CardBody>
            </Card>
        </div >
    )
}

export default CreateServiceRequest;