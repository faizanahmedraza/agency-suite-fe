import React, { useState } from "react";
import { useDispatch, useSelector } from "@store/store";
import { useNavigate } from 'react-router-dom';
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Label,
  Input,
  Col,
  Row,
  Button,
  Spinner
} from 'reactstrap'
import PasswordUpdateAction from "@store/V1/UpdatePassword/UPDATE/UpdatePasswordAction";

const UpdatePassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordUpdate, setPasswordUpdate] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const { loading } = useSelector((state) => state.change_password.update);

  const handleInputField = async (e) => {
    setPasswordUpdate({
      ...passwordUpdate,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(PasswordUpdateAction.passwordUpdate(passwordUpdate));
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h1>Update Password</h1>
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <h3>Update Password</h3>
            <div className='col-md-2'>
              <Button.Ripple color='primary' className="w-100" onClick={() => navigate(-1)}> Back</Button.Ripple>
            </div>
          </div>
          <hr />
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col md="5">
                <div className='mb-1'>
                  <Label className='form-label'>
                    Old Password
                  </Label>
                  <InputPasswordToggle
                    className="input-group-merge"
                    value={passwordUpdate?.old_password}
                    name="old_password"
                    onChange={handleInputField}
                    id="old_password"
                  />
                </div>
                <div className='mb-1'>
                  <Label className='form-label'>
                    Password
                  </Label>
                  <InputPasswordToggle
                    className="input-group-merge"
                    value={passwordUpdate?.password}
                    name="password"
                    onChange={handleInputField}
                    id="password"
                  />
                </div>
                <div className='mb-1'>
                  <Label className='form-label'>
                    Password Confirmation
                  </Label>
                  <InputPasswordToggle
                    className="input-group-merge"
                    value={passwordUpdate?.password_confirmation}
                    name="password_confirmation"
                    onChange={handleInputField}
                    id="password_confirmation"
                  />
                </div>
              </Col>
              <Col sm="12">
                <div className="d-flex justify-content-end">
                  <Button color="primary" disabled={loading} type="submit">
                    {
                      loading ?
                        <>
                          <Spinner color='white' size='sm' type='grow' />
                          <span className='ms-50'>Loading...</span>
                        </>
                        :
                        <span>
                          Save
                        </span>
                    }
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default UpdatePassword;