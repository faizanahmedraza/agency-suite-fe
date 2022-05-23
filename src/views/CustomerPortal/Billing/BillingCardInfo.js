import React, { useState, useEffect } from 'react'
import {
    Label,
    Input,
    Button,
    Form
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import CardInfoModal from '@src/views/CustomerPortal/Billing/CardInfoModal';
import { Plus } from "react-feather";

const Loader = () => {
    return (
        <div className="text-center">
            <strong>Loading...</strong>
        </div>
    );
};

const BillingCardInfo = (props) => {

    const dispatch = useDispatch();
    const [centeredModal, setCenteredModal] = useState(false)

    const {
        customer_billing_information: { list: { customer_billing_information } }
    } = useSelector(state => state);

    const [invoicePaid, setInvoicePaid] = useState({
        card_no: "",
        invoice_id: props.invoiceId ? props.invoiceId : ""
    });

    useEffect(() => {
        dispatch(BillingInformationListAction.billingInformationList());
    }, []);

    const handleInvoicePaidField = (e) => {
        setInvoicePaid({
            ...invoicePaid,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }

    const cardToggleModal = () => {
        setCenteredModal(!centeredModal);
    }

    return (
        <div>
            <Form onSubmit={onSubmitHandler}>
                <Label className='form-label fs-5' for='select-basic'>
                    Payment Method
                </Label>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex justify-content-between w-50'>
                        <Input type='select' className="flex-grow-1" name='card_no' id='select-custom' value={invoicePaid.card_no} onChange={handleInvoicePaidField}>
                            <option value="">Select Card</option>
                            {
                                customer_billing_information && customer_billing_information.map((option) => {
                                    return <option value={option.id} key={option.id}>.... .... .... {option.last_digits}</option>
                                })
                            }
                        </Input>
                        <Button.Ripple color='primary' className="w-25 ms-2" onClick={cardToggleModal}><Plus size={15} /></Button.Ripple>
                    </div>
                    <Button color='primary' className='w-25' type='submit'>
                        <span>
                            Paid
                        </span>
                    </Button>
                </div>
            </Form>
            {/* Billing Information modal */}
            <CardInfoModal onShow={centeredModal} onHide={cardToggleModal} />
        </div >
    )
}

export default BillingCardInfo;