import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/store";
import { Link } from 'react-router-dom';
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
import { convertBase64 } from "@utils";
import ProfileSettingDetailAction from "@store/V1/ProfileSetting/DETAIL/ProfileSettingDetailAction";
import ProfileSettingUpdateAction from "@store/V1/ProfileSetting/UPDATE/ProfileSettingUpdateAction";

const Profile = () => {

  const [profileSetting, setProfileSetting] = useState({
    name: "",
    image: null,
  });
  const dispatch = useDispatch();
  const {
    detail: { profile_settings, fetched },
    update: { loading }
  } = useSelector((state) => state.profile_settings);

  const handleInputField = async (e) => {

    const file = e.target.files ? e.target.files[0] : null

    const base64 = file && await convertBase64(file)

    setProfileSetting({
      ...profileSetting,
      [e.target.name]: base64 ? base64 : e.target.value
    })

  }

  useEffect(() => {
    dispatch(ProfileSettingDetailAction.profileSettingDetail());
    if (fetched) {
      setProfileSetting(profile_settings);
    }
  }, [fetched]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(ProfileSettingUpdateAction.profileSettingUpdate(profileSetting));
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h1>Profile</h1>
        </CardHeader>
      </Card>
      <Card>
        <CardBody>
          <h4>Update Password</h4>
          <div className='d-flex justify-content-between'>
            <p>Follow the recovery process to change your password.</p>
            <Link to='/dashboard'><h5 className='font-weight-bold text-danger'>Update Password &rarr;</h5></Link>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div>
            <h3>Profile details</h3>
            <hr />
            <Form onSubmit={onSubmitHandler}>
              <Col md="5">
                <div className='mb-1'>
                  <Label className='form-label'>
                    Name
                  </Label>
                  <Input type='text' onChange={handleInputField} name='name' value={profileSetting.name} />
                </div>
                <div className='mb-1'>
                  <Label className='form-label'>
                    Photo
                  </Label>
                  &nbsp;
                  <small><Label>( Recommended: 50x50 px. )  </Label></small>
                  <Row>
                    <Col md="2">
                      <div className='mt-0'>
                        <img className='rounded-circle' src={
                          profileSetting.image || "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"
                        } width="60px" alt="service image" />
                      </div>
                    </Col>
                    <Col md="8" className='pt-1' >
                      <Input type='file' onChange={handleInputField} accept="image/*" name='image' id='nameMulti' />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col sm="12">
                <div className="d-flex justify-content-end">
                  <Button color="primary" type="submit">
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
            </Form>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Profile