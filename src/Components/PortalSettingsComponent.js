import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@store/store";
import {
    Card,
    CardBody,
    CardHeader,
    TabContent,
    TabPane,
    Form,
    Label,
    Input,
    Col,
    Row,
    Button,
    Spinner
} from "reactstrap";
import { convertBase64 } from "@utils";
import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
import PortalSettingUpdateAction from "@store/V1/PortalSetting/UPDATE/PortalSettingUpdateAction";

const Portal = () => {
    const [active, setActive] = useState("1");

    const [portalSetting, setPortalSetting] = useState({
        agency: {
            name: "",
            default_domain: "",
        },
        logo: null,
        favicon: null,
        primary_color: "",
        secondary_color: "",
    });
    const dispatch = useDispatch();
    const {
        detail: { portal_settings, fetched, loading },
        update: { loading: updateLoading, isChanged, portal_settings: updatedPortalSettings },
    } = useSelector((state) => state.portal_settings);

    const handleInputField = async (e) => {
        const file = e.target.files ? e.target.files[0] : null;

        const base64 = file && (await convertBase64(file));

        setPortalSetting({
            ...portalSetting,
            [e.target.name]: base64 ? base64 : e.target.value,
        });
    };

    const handleNestedObject = (e) => {
        setPortalSetting((prevPortalSetting) => ({
            ...prevPortalSetting,
            agency: { name: e.target.value }
        }));
    }

    useEffect(() => {
        dispatch(PortalSettingDetailAction.portalSettingDetail());
        if (fetched && !isChanged) return setPortalSetting(portal_settings);
        setPortalSetting(updatedPortalSettings)
    }, [fetched, isChanged]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(PortalSettingUpdateAction.portalSettingUpdate(portalSetting));
    };

    return (
        <div>
            {/* <Card>
                <CardHeader>
                    <h1>Portal Settings</h1>
                </CardHeader>
            </Card> */}
            <Card>
                <CardBody>
                    <TabContent className="py-50" activeTab={active}>
                        <TabPane tabId="1">
                            {
                                loading ?
                                    <Row>
                                        <div className="text-center">
                                            <strong>Loading...</strong>
                                        </div>
                                    </Row>
                                    :
                                    <Form onSubmit={onSubmitHandler}>
                                        <Col md="6">
                                            <div className="mb-1">
                                                <Label className="form-label" for="name">Agency Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleNestedObject}
                                                    name="name"
                                                    id="name"
                                                    value={portalSetting?.agency?.name ?? ""}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="mb-1">
                                                <Label className="form-label" for="default_domain">Domain ( You can change domain by adding new domain. )</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleNestedObject}
                                                    name="default_domain"
                                                    id="default_domain"
                                                    value={portalSetting?.agency?.default_domain ?? ""}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="8">
                                            <div className="mb-1">
                                                <Label className="form-label">
                                                    Primary Color ( The primary color will apply to buttons
                                                    and links. )
                                                </Label>
                                                <Input
                                                    type="color"
                                                    className="w-25"
                                                    style={{ height: "30px" }}
                                                    onChange={handleInputField}
                                                    name="primary_color"
                                                    placeholder="Enter Service Name"
                                                    value={!loading ? portalSetting.primary_color : ''}
                                                />
                                            </div>
                                            <div className="mb-1">
                                                <Label className="form-label">
                                                    Seconday Color ( The secondary color will apply to
                                                    backgrounds and headers. )
                                                </Label>
                                                <Input
                                                    type="color"
                                                    className="w-25"
                                                    style={{ height: "30px" }}
                                                    onChange={handleInputField}
                                                    name="secondary_color"
                                                    placeholder="Enter Service Name"
                                                    value={!loading ? portalSetting.secondary_color : ''}
                                                />
                                            </div>
                                            <div className="mb-1">
                                                <Label className="form-label">
                                                    Logo{" "}
                                                    <small>
                                                        ( Recommended: 200x50 px or similar proportions.
                                                        Transparent background image. ){" "}
                                                    </small>
                                                </Label>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <Row>
                                                <Col md="6">
                                                    <div >
                                                        <img
                                                            src={
                                                                portalSetting.logo ||
                                                                "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"
                                                            }
                                                            className="image-box"
                                                            alt="service image"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="6" className="pt-1">
                                                    <Input
                                                        type="file"
                                                        onChange={handleInputField}
                                                        accept="image/*"
                                                        name="logo"
                                                        id="logo"
                                                    />
                                                </Col>
                                            </Row>
                                            <div className="mb-1">
                                                <Label className="form-label" for="nameMulti">
                                                    Favicon
                                                </Label>
                                                <Row>
                                                    <Col md="6">
                                                        <div >
                                                            <img
                                                                src={
                                                                    portalSetting.favicon ||
                                                                    "https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg"
                                                                }
                                                                className="image-box"
                                                                alt="service image"
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md="6" className="pt-1">
                                                        <Input
                                                            type="file"
                                                            onChange={handleInputField}
                                                            accept="image/*"
                                                            name="favicon"
                                                            id="fav"
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col sm="12">
                                            <div className="d-flex justify-content-end">
                                                <Button color="primary" disabled={updateLoading} type="submit">
                                                    {
                                                        updateLoading ?
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
                            }
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </div >
    );
};

export default Portal;
