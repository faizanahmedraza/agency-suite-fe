import React, { useState, useEffect } from 'react'
import {
    Label,
    Input,
    Button,
} from 'reactstrap'
import { useDispatch, useSelector } from '@store/store'
import BillingInformationListAction from "@store/V1/CustomerPortal/BillingInformation/LIST/BillingInformationListAction";
import CardInfoModal from '@src/views/CustomerPortal/Billing/CardInfoModal';
import { Plus } from "react-feather";

const BillingCardInfo = (props) => {

    const dispatch = useDispatch();
    const [centeredModal, setCenteredModal] = useState(false)

    const {
        customer_billing_information: {
            list: { customer_billing_information }
        }
    } = useSelector(state => state);

    useEffect(() => {
        dispatch(BillingInformationListAction.billingInformationList());
    }, []);

    const cardToggleModal = () => {
        setCenteredModal(!centeredModal);
    }

    return (
        <div className='w-50'>
            <Label className='form-label fs-5' for='select-basic'>
                Payment Method
            </Label>
            <div className='d-flex justify-content-between'>
                <Input type='select' className="flex-grow-1" name='card_id' id='select-custom' value={props.cardId} onChange={props.onChangeField}>
                    <option value="">Select Card</option>
                    {
                        customer_billing_information && customer_billing_information.map((option) => {
                            return <option value={option.id} key={option.id}>.... .... .... {option.last_digits}</option>
                        })
                    }
                </Input>
                <Button.Ripple color='primary' className="w-25 ms-2" onClick={cardToggleModal}><Plus size={15} /></Button.Ripple>
            </div>
            {/* Billing Information modal */}
            <CardInfoModal onShow={centeredModal} onHide={cardToggleModal} />
        </div>
    )
}

export default BillingCardInfo;