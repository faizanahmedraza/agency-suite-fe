import React, { useState, useEffect } from 'react'
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
import Select from 'react-select'
import { useDispatch, useSelector } from '@store/store'
import ServiceActions from '@store/V1/Service/List/ServiceListAction';
import CustomerListAction from "@store/V1/Customer/LIST/CustomerListAction";
import InvoiceCreateAction from "@store/V1/Invoice/Create/InvoiceCreateAction"
import { Link } from "react-router-dom"
import AsyncSelect from 'react-select/async';
import CustomerService from '@src/Services/V1/CustomerService';
import AgencyService from '@src/Services/V1/AgencyService';
import GeneralHelper from "@src/Helpers/GeneralHelper";

const Loader = () => {
    return (
        <div className='d-flex justify-content-center'><strong>Loading...</strong></div>
    );
}

const CreateInvoice = () => {
    const dispatch = useDispatch();

    const {
        service: { list: { services, loading: serviceLoading } },
        customers: { list: { customers, loading: customerLoading } },
        invoices: {
            create: { loading },
        },
    } = useSelector(state => state);

    const [inputCustomerValue, setCustomerValue] = useState('');
    const [inputServiceValue, setServiceValue] = useState('');

    const [invoiceDetails, setInvoiceDetails] = useState({
        invoice_type: "",
        service_id: "",
        customer_id: "",
        recurring_type: "",
        title: "",
        description: "",
        is_recurring: false,
        selected_service: null,
        quantity: 1
    })


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
    }, []);

    const handleInputField = (e) => {
        setInvoiceDetails({
            ...invoiceDetails,
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
            invoiceDetails.customer_id = options.value;
        } else if (e.name == "invoice_type") {
            invoiceDetails.invoice_type = options.value;
            if (options.value == "custom") {
                invoiceDetails.is_recurring = false;
                invoiceDetails.selected_service = null;
            }
        } else {
            invoiceDetails.service_id = options.value;
            invoiceDetails.selected_service = services.find(service => service.id === Number(options.value));
            invoiceDetails.is_recurring = invoiceDetails.selected_service?.subscription_type == "recurring" ? true : false;
        }
        setInvoiceDetails({
            ...invoiceDetails
        });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(InvoiceCreateAction.invoiceCreate(invoiceDetails));
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

    const invoiceOptions = [
        { value: '', label: 'Select...' },
        { value: 'custom', label: 'Custom' },
        { value: 'service', label: 'Service' },
    ]

    return (
        <div>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Create Invoice</h1>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Form onSubmit={onSubmitHandler}>
                        <Row>
                            <Col md="12" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Invoice To
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
                            <Col md="12" sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label fs-5' for='select-basic'>
                                        Select Type
                                    </Label>
                                    <Select
                                        className='react-select'
                                        classNamePrefix='select'
                                        defaultValue={invoiceOptions[0]}
                                        options={invoiceOptions}
                                        isClearable={false}
                                        name="invoice_type"
                                        onChange={(options, e) => handleOnChange(options, e)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        {
                            (invoiceDetails.invoice_type == "custom")
                                ?
                                <Row>

                                </Row>
                                :
                                (invoiceDetails.invoice_type == "service") &&
                                <Row>
                                    {
                                        (serviceLoading) ? <Loader /> :
                                            <Col md="12" sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label' for='select-basic'>
                                                        Service
                                                    </Label>
                                                    <AsyncSelect
                                                        isClearable={false}
                                                        cacheOptions
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
                                    }
                                    {
                                        (invoiceDetails.is_recurring && invoiceDetails.selected_service != null) &&
                                        <Row>
                                            <Col md='12' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label pb-0 mb-0' for='select-basic'>
                                                        Service Subscription
                                                    </Label>
                                                    <div className='demo-inline-spacing'>
                                                        {invoiceDetails.selected_service.price_types.weekly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' value="weekly" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr4'>
                                                                    {'weekly - $' + Number.parseFloat(invoiceDetails.selected_service.price_types.weekly).toFixed(2)}
                                                                </Label>
                                                            </div> : ""
                                                        }
                                                        {invoiceDetails.selected_service.price_types.monthly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr5' value="monthly" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr5'>
                                                                    {'monthly - $' + Number.parseFloat(invoiceDetails.selected_service.price_types.monthly).toFixed(2)}
                                                                </Label>
                                                            </div> : ""
                                                        }
                                                        {invoiceDetails.selected_service.price_types.quarterly ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr3' value="quarterly" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr3'>
                                                                    {'quarterly - $' + Number.parseFloat(invoiceDetails.selected_service.price_types.quarterly).toFixed(2)}
                                                                </Label>
                                                            </div> : ""
                                                        }
                                                        {invoiceDetails.selected_service.price_types.biannually ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr2' value="biannually" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr2'>
                                                                    {'biannually - $' + Number.parseFloat(invoiceDetails.selected_service.price_types.biannually).toFixed(2)}
                                                                </Label>
                                                            </div> : ""
                                                        }
                                                        {invoiceDetails.selected_service.price_types.annually ?
                                                            <div className='form-check'>
                                                                <Input type='radio' name='recurring_type' id='sr1' value="annually" onChange={handleInputField} />
                                                                <Label className='form-check-label' for='sr1'>
                                                                    {'annually - $' + Number.parseFloat(invoiceDetails.selected_service.price_types.annually).toFixed(2)}
                                                                </Label>
                                                            </div> : ""
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                    {
                                        (!invoiceDetails.is_recurring && invoiceDetails.selected_service != null) &&
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
                                                        ${Number.parseFloat(invoiceDetails?.selected_service?.price_types?.price ?? 0).toFixed(2)}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col md='4' sm='12'>
                                                <div className='mb-1'>
                                                    <Label className='form-label fs-5' for='select-basic'>
                                                        Purchase Limit
                                                    </Label>
                                                    <p className='text-wrap'>
                                                        {invoiceDetails?.selected_service?.price_types?.purchase_limit ?? "---"}
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    }
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Title
                                            </Label>
                                            <Input type='text' value={invoiceDetails.title} onChange={handleInputField} name='title' id='title' placeholder='Enter Title' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label' for='nameMulti'>
                                                Description
                                            </Label>
                                            <Input type='textarea' value={invoiceDetails.description} onChange={handleInputField} name='description' id='description' placeholder='Enter Description' />
                                        </div>
                                    </Col>
                                    <Col md='12' sm='12'>
                                        <div className='mb-1'>
                                            <Label className='form-label fs-5' for='select-basic'>
                                                Quantity
                                            </Label>
                                            <Input type='number' value={invoiceDetails.quantity} onChange={handleInputField} name='quantity' id='quantity' placeholder='Enter Quantity' />
                                        </div>
                                    </Col>
                                </Row>
                        }
                        <Row>
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
                </CardBody>
            </Card>
        </div >
    )
}

export default CreateInvoice