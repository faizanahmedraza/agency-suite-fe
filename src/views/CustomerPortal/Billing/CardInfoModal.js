import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "@store/store";
import {
  Row,
  Col,
  Label,
  Input,
  Form,
  Button,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormValidation from '@src/validations/BillingInfoCard';
import BillingInformationCreateAction from "@store/V1/CustomerPortal/BillingInformation/CREATE/BillingInformationCreateAction";

const CardInfoModal = (props) => {
  const dispatch = useDispatch();
  const billingInformation = {
    holder_name: "",
    card_no: "",
    cvc: "",
    expiry_month: "",
    expiry_year: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zip_code: "",
    street: "",
  };
  const [billingInfoDetail, setBillingInfoDetails] =
    useState(billingInformation);

  const {
    customer_billing_information: {
      create: { loading: createBillingInfoLoading, success },
    },
  } = useSelector((state) => state);

  const handleBillingInfoInputField = (e) => {
    setBillingInfoDetails({
      ...billingInfoDetail,
      [e.target.name]: e.target.value,
    });
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(FormValidation) })

  useEffect(() => {
    if (success) {
      props.onHide();
      reset(billingInformation)
      setBillingInfoDetails(billingInformation);
    }
  }, [success]);

  const onSubmitBillingHandler = (data) => {
    setBillingInfoDetails(data);
    dispatch(
      BillingInformationCreateAction.billingInformationCreate(data)
    );
  };

  return (
    <div className="vertically-centered-modal">
      <Modal
        isOpen={props.onShow}
        toggle={props.onHide}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={props.onHide}>
          Your Billing Information
        </ModalHeader>
        <Form onSubmit={handleSubmit(onSubmitBillingHandler)}>
          <ModalBody>
            <Row>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="holder_name">
                    Holder Name
                  </Label>
                  <Controller
                    name="holder_name"
                    id="holder_name"
                    defaultValue={billingInfoDetail.holder_name}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" placeholder='Enter Holder Name' invalid={errors.holder_name && true} />}
                  />
                  {errors.holder_name && <FormFeedback>{errors.holder_name.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="card_no">
                    Card Number
                  </Label>
                  <Controller
                    name="card_no"
                    id="card_no"
                    defaultValue={billingInfoDetail.card_no}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="number" placeholder='Enter Card Number' invalid={errors.card_no && true} />}
                  />
                  {errors.card_no && <FormFeedback>{errors.card_no.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="cvc">
                    CVC
                  </Label>
                  <Controller
                    name="cvc"
                    id="cvc"
                    defaultValue={billingInfoDetail.cvc}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="number" placeholder='Enter CVC' invalid={errors.cvc && true} />}
                  />
                  {errors.cvc && <FormFeedback>{errors.cvc.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="expiry_month">
                    Expiry Month
                  </Label>
                  <Controller
                    name="expiry_month"
                    id="expiry_month"
                    defaultValue={billingInfoDetail.expiry_month}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="number" placeholder='Enter Expiry Month For e.g: 12' invalid={errors.expiry_month && true} />}
                  />
                  {errors.expiry_month && <FormFeedback>{errors.expiry_month.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="expiry_year">
                    Expiry Year
                  </Label>
                  <Controller
                    name="expiry_year"
                    id="expiry_year"
                    defaultValue={billingInfoDetail.expiry_year}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="number" placeholder='Enter Expiry Year For e.g: 22' invalid={errors.expiry_year && true} />}
                  />
                  {errors.expiry_year && <FormFeedback>{errors.expiry_year.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="country">
                    Country
                  </Label>
                  <Controller
                    name="country"
                    id="country"
                    defaultValue={billingInfoDetail.country}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" placeholder='Enter Country' invalid={errors.country && true} />}
                  />
                  {errors.country && <FormFeedback>{errors.country.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="city">
                    City
                  </Label>
                  <Controller
                    name="city"
                    id="city"
                    defaultValue={billingInfoDetail.city}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" placeholder='Enter City' invalid={errors.city && true} />}
                  />
                  {errors.city && <FormFeedback>{errors.city.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="state">
                    State
                  </Label>
                  <Controller
                    name="state"
                    id="state"
                    defaultValue={billingInfoDetail.state}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" placeholder='Enter State' invalid={errors.state && true} />}
                  />
                  {errors.state && <FormFeedback>{errors.state.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="zip_code">
                    Zip Code
                  </Label>
                  <Controller
                    name="zip_code"
                    id="zip_code"
                    defaultValue={billingInfoDetail.zip_code}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" placeholder='Enter Zip Code' invalid={errors.zip_code && true} />}
                  />
                  {errors.zip_code && <FormFeedback>{errors.zip_code.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="street">
                    Street Address
                  </Label>
                  <Controller
                    name="street"
                    id="street"
                    defaultValue={billingInfoDetail.street}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="text" placeholder='Enter Street Address' invalid={errors.street && true} />}
                  />
                  {errors.street && <FormFeedback>{errors.street.message}</FormFeedback>}
                </div>
              </Col>
              <Col md="12" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="address">
                    Address
                  </Label>
                  <Controller
                    name="address"
                    id="address"
                    defaultValue={billingInfoDetail.address}
                    onChange={handleBillingInfoInputField}
                    control={control}
                    render={({ field }) => <Input {...field} type="textarea" placeholder='Enter Full Address' invalid={errors.address && true} />}
                  />
                  {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={props.onHide}>
              Cancel
            </Button>
            <Button
              color="success"
              type="submit"
              disabled={createBillingInfoLoading}
            >
              {createBillingInfoLoading ? (
                <>
                  <Spinner color="white" size="sm" type="grow" />
                  <span className="ms-50">Loading...</span>
                </>
              ) : (
                <span>Create</span>
              )}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default CardInfoModal;
