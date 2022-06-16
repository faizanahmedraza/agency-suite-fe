import React, { useState, useEffect } from 'react'
import {
    Label,
    Input,
    Button,
} from 'reactstrap'
import CardInfoModal from '@src/views/CustomerPortal/Billing/CardInfoModal';
import { Plus } from "react-feather";

const BillingCardInfo = ({ billingInfoList,cardId,onChangeField }) => {
    const [centeredModal, setCenteredModal] = useState(false)

    useEffect(() => {
        return () => {
            setCenteredModal(false)
        };
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
                <Input type='select' className="flex-grow-1" name='card_id' id='select-custom' defaultValue={cardId} onChange={onChangeField}>
                    <option value="">Select Card</option>
                    {
                        billingInfoList && billingInfoList.map((option) => {
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