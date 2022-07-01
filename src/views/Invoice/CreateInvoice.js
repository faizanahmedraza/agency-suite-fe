import React, { useState, useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { EditorState, convertToRaw } from 'draft-js';
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
import Select from 'react-select'
import { SlideDown } from 'react-slidedown'
import { X, Plus } from 'react-feather'
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
    const [inputCustomerValue, setCustomerValue] = useState('');
    const [inputServiceValue, setServiceValue] = useState('');
    const [count, setCount] = useState(1)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [invoiceDetails, setInvoiceDetails] = useState({
        invoice_type: "",
        service_id: "",
        customer_id: "",
        recurring_type: "",
        title: "",
        description: "",
        is_recurring: false,
        selected_service: null,
        quantity: "",
        invoice_items: [
            {
                id: uuidv4(),
                name: "",
                rate: "",
                quantity: "",
                discount: "",
                amount: "",
            }
        ]
    })

    const {
        service: { list: { services, loading: serviceLoading } },
        customers: { list: { customers, loading: customerLoading } },
        invoices: {
            create: { loading },
        },
    } = useSelector(state => state);

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

    const descriptionSaveContent = (content) => {
        setInvoiceDetails({
            ...invoiceDetails,
            description: JSON.stringify(convertToRaw(content)),
        });
    }

    const onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        descriptionSaveContent(contentState);
        setEditorState(editorState);
    };

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
                setCount(1)
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


    // Addable Inputs
    const handleChangeInput = (id, event) => {
        const newInputFields = invoiceDetails.invoice_items.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });
        setInvoiceDetails(prevInvoiceDetails => ({
            ...prevInvoiceDetails,
            invoice_items: newInputFields
        }))
    };
    const handleRemoveFields = (id) => {
        const values = [...invoiceDetails.invoice_items];
        values.splice(
            values.findIndex((val) => val.id === id),
            1
        );
        setInvoiceDetails(prevInvoiceDetails => ({
            ...prevInvoiceDetails,
            invoice_items: values
        }))
    };
    const handleAddFields = () => {
        setInvoiceDetails(prevInvoiceDetails => ({
            ...prevInvoiceDetails,
            invoice_items: [
                ...prevInvoiceDetails.invoice_items,
                { id: uuidv4(), name: "", rate: "", quantity: "", discount: "", amount: "", }
            ]
        }))
    };

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
                    {customerLoading ? <Loader /> :
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
                                        <Col md="12" sm="12">
                                            <div className='mb-1'>
                                                {invoiceDetails.invoice_items && invoiceDetails?.invoice_items.map((inputField, i) => (
                                                    <div key={inputField.id} >
                                                        <Row className='justify-content-between align-items-center'>
                                                            <Col md={4} className='mb-md-0 mb-1'>
                                                                <Label className='form-label' for={`animation-item-name-${i}`}>
                                                                    Item Name
                                                                </Label>
                                                                <Input name="name" onChange={(event) =>
                                                                    handleChangeInput(inputField.id, event)
                                                                } value={inputField.name} type='text' id={`animation-item-name-${i}`} placeholder='Item Name' />
                                                            </Col>
                                                            <Col md={2} className='mb-md-0 mb-1'>
                                                                <Label className='form-label' for={`animation-cost-${i}`}>
                                                                    Rate
                                                                </Label>
                                                                <Input
                                                                    name="rate"
                                                                    onChange={(event) =>
                                                                        handleChangeInput(inputField.id, event)
                                                                    }
                                                                    value={inputField.rate}
                                                                    type='number'
                                                                    id={`animation-cost-${i}`}
                                                                    placeholder='Rate (Min 0)'
                                                                    min={0} />
                                                            </Col>
                                                            <Col md={2} className='mb-md-0 mb-1'>
                                                                <Label className='form-label' for={`animation-quantity-${i}`}>
                                                                    Quantity
                                                                </Label>
                                                                <Input
                                                                    name='quantity'
                                                                    onChange={(event) =>
                                                                        handleChangeInput(inputField.id, event)
                                                                    }
                                                                    value={inputField.quantity}
                                                                    type='number'
                                                                    id={`animation-quantity-${i}`}
                                                                    placeholder='Quantity (Min 1)'
                                                                    min={1}
                                                                />
                                                            </Col>
                                                            <Col md={2} className='mb-md-0 mb-1'>
                                                                <Label className='form-label' for={`animation-quantity-${i}`}>
                                                                    Discount
                                                                </Label>
                                                                <Input
                                                                    name='discount'
                                                                    onChange={(event) =>
                                                                        handleChangeInput(inputField.id, event)
                                                                    }
                                                                    value={inputField.discount}
                                                                    type='number'
                                                                    id={`animation-quantity-${i}`}
                                                                    placeholder='Discount (Min 0)'
                                                                    min={0} />
                                                            </Col>
                                                            <Col md={2} className='mb-md-0 mb-1'>
                                                                <Label className='form-label' for={`animation-price-${i}`}>
                                                                    Amount
                                                                </Label>
                                                                <input
                                                                    readOnly
                                                                    disabled
                                                                    value={`$ ${(inputField.rate * inputField.quantity) - inputField.discount}`}
                                                                    name="amount"
                                                                    placeholder='$32'
                                                                    id={`animation-price-${i}`}
                                                                    className='form-control-plaintext'
                                                                />
                                                            </Col>
                                                            <Col sm={12}>
                                                                <hr />
                                                            </Col>
                                                        </Row>

                                                        <div className="d-flex  text-right ms-auto">
                                                            <Button
                                                                color="primary"
                                                                onClick={handleAddFields}
                                                            >
                                                                ADD
                                                            </Button>
                                                            &nbsp;
                                                            <Button
                                                                color='secondary'
                                                                outline
                                                                disabled={invoiceDetails.invoice_items.length === 1}
                                                                onClick={() =>
                                                                    handleRemoveFields(inputField.id)
                                                                }
                                                            >
                                                                DELETE
                                                            </Button>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
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
                                                <Input type='number' value={invoiceDetails.quantity} onChange={handleInputField} name='quantity' id='quantity' placeholder='Quantity (Minimum 1)' />
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
                    }
                </CardBody>
            </Card>
        </div >
    )
}

export default CreateInvoice