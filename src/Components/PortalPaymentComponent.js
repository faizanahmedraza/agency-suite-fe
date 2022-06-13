import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import PaymentGatewayCreateAction from "@store/V1/PaymentGateway/Create/PaymentGatewayCreateAction";
import PaymentGatewayListAction from "@store/V1/PaymentGateway/Detail/PaymentGatewayDetailAction";
import PaymentGatewayStatusAction from "@store/V1/PaymentGateway/Status/PaymentGatewayStatusAction";
import { useDispatch } from "@store/store";
import { useSelector } from "react-redux";

const CardPayment = () => {
  const dispatch = useDispatch();
  const [warningUpdateModal, setWarningUpdateModal] = useState(false);
  const [warningStatusModal, setWarningStatusModal] = useState(false);

  const {
    list: { loading, gateway, isFetched },
    create: { loading: createLoading, gateway: createGateway, success },
    status: { loading: statusLoading, successStatus  },
  } = useSelector((state) => state.payment_gateway);

  const [paymentInfo, setPaymentInfo] = useState({
    gateway: "stripe",
    gateway_id: "",
    gateway_secret: "",
    is_enable: "yes",
  });

  const handleChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!isFetched || successStatus) dispatch(PaymentGatewayListAction.paymentGatewayList("stripe"));
    if (isFetched && !success) return setPaymentInfo(gateway);
    setPaymentInfo(createGateway);
    if (success) {
      setWarningUpdateModal(!warningUpdateModal);
    }
    if (successStatus) {
      setWarningUpdateModal(!warningStatusModal);
    }
  }, [isFetched, success, successStatus]);

  const submitSaveFormModal = () => {
    dispatch(PaymentGatewayCreateAction.paymentGatewayCreate(paymentInfo));
  };

  const submitStatusModal = () => {
    dispatch(PaymentGatewayStatusAction.paymentGatewayStatus("stripe"));
  };

  return (
    <Card className="card-payment">
      <CardHeader>
        <CardTitle tag="h4">Stripe</CardTitle>
        <CardTitle className="text-primary" tag="h4">
          <div className="form-switch form-check-primary">
            <Input
              type='switch'
              checked={paymentInfo?.is_enable === "yes" ?? false}
              onChange={() => setWarningStatusModal(!warningStatusModal)}
              value={paymentInfo?.is_enable === "yes"}
              id='icon-primary'
              name='icon-primary'
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="9" sm="12">
            <Label className="form-label" for="payment-expiry">
              Client Secret
            </Label>
            <Input
              type="text"
              onChange={handleChange}
              value={!loading ? paymentInfo?.gateway_secret ?? "" : ""}
              name="gateway_secret"
              id="nameMulti"
              disabled={paymentInfo?.is_enable === "no"}
            />
          </Col>
          <Col className="text-end pt-2" md="3" sm="12">
            <Button onClick={() => setWarningUpdateModal(!warningUpdateModal)}>
              Save
            </Button>
          </Col>
        </Row>
      </CardBody>
      {/* Warning Update modal */}
      <div className="vertically-centered-modal">
        <Modal
          isOpen={warningUpdateModal}
          toggle={() => setWarningUpdateModal(!warningUpdateModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader
            toggle={() => setWarningUpdateModal(!warningUpdateModal)}
          >
            Confirmation
          </ModalHeader>
          <ModalBody>
            By changing your <b>Secret key</b> old customers attached card will
            stop working ?
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              outline
              onClick={() => setWarningUpdateModal(!warningUpdateModal)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={submitSaveFormModal}
              disabled={createLoading}
            >
              {createLoading ? (
                <>
                  <Spinner color="white" size="sm" type="grow" />
                  <span className="ms-50">Loading...</span>
                </>
              ) : (
                <span>Yes</span>
              )}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* Toggle Status */}
      <div className="vertically-centered-modal">
        <Modal
          isOpen={warningStatusModal}
          toggle={() => setWarningStatusModal(!warningStatusModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader
            toggle={() => setWarningStatusModal(!warningStatusModal)}
          >
            Confirmation
          </ModalHeader>
          <ModalBody>
            By disabling this your customers payment option stop working?
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              outline
              onClick={() => setWarningStatusModal(!warningStatusModal)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={submitStatusModal}
              disabled={statusLoading}
            >
              {statusLoading ? (
                <>
                  <Spinner color="white" size="sm" type="grow" />
                  <span className="ms-50">Loading...</span>
                </>
              ) : (
                <span>Yes</span>
              )}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Card>
  );
};

export default CardPayment;
