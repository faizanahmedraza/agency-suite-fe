import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "@store/store";
import LoginAction from "@store/V1/Auth/Login/LoginAction";
import PortalSettingDetailAction from "@store/V1/PortalSetting/DETAIL/PortalSettingDetailAction";
import Loader from "@src/Components/LoaderComponent"
import { ChevronRight } from 'react-feather'

const LoginCover = () => {
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const {
    login: {
      loading
    },
    portal_settings:
    {
      detail: {
        loading: portalDetailLoading,
        portal_settings,
        fetched
      }
    }
  } = useSelector((state) => state);

  const [agencyInformation, setAgencyInformation] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setAgencyInformation({
      ...agencyInformation,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(LoginAction.postLogin(agencyInformation));
  };

  useEffect(() => {
    if (!fetched) return dispatch(PortalSettingDetailAction.portalSettingDetail());
  }, [fetched])


  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/login-v2.svg`).default;

  return (
    <div className="auth-wrapper auth-cover">

      {
        portalDetailLoading ?
          <Loader />
          :
          <Row className="auth-inner m-0">
            <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
              {portal_settings.logo ?
                <img src={portal_settings?.logo} height="28" />
                :
                <svg viewBox="0 0 139 95" version="1.1" height="28">
                  <defs>
                    <linearGradient
                      x1="100%"
                      y1="10.5120544%"
                      x2="50%"
                      y2="89.4879456%"
                      id="linearGradient-1"
                    >
                      <stop stopColor="#000000" offset="0%"></stop>
                      <stop stopColor="#FFFFFF" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient
                      x1="64.0437835%"
                      y1="46.3276743%"
                      x2="37.373316%"
                      y2="100%"
                      id="linearGradient-2"
                    >
                      <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                      <stop stopColor="#FFFFFF" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                      <g id="Group" transform="translate(400.000000, 178.000000)">
                        <path
                          d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                          id="Path"
                          className="text-primary"
                          style={{ fill: "currentColor" }}
                        ></path>
                        <path
                          d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                          id="Path"
                          fill="url(#linearGradient-1)"
                          opacity="0.2"
                        ></path>
                        <polygon
                          id="Path-2"
                          fill="#000000"
                          opacity="0.049999997"
                          points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                        ></polygon>
                        <polygon
                          id="Path-2"
                          fill="#000000"
                          opacity="0.099999994"
                          points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                        ></polygon>
                        <polygon
                          id="Path-3"
                          fill="url(#linearGradient-2)"
                          opacity="0.099999994"
                          points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                        ></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
              }

            </Link>
            <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
              <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                <img className="img-fluid" src={source} alt="Login Cover" />
              </div>
            </Col>
            <Col
              className="d-flex align-items-center auth-bg px-2 p-lg-5"
              lg="4"
              sm="12"
            >
              <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                <CardTitle tag="h2" className="fw-bold mb-1">
                  Welcome to {portal_settings ? portal_settings?.agency?.name : 'Agency Tool'}! ????
                </CardTitle>
                <CardText className="mb-2">
                  Please sign-in to your account and start the adventure
                </CardText>
                <Form className="auth-login-form mt-2" onSubmit={onSubmitHandler}>
                  <div className="mb-1">
                    <Label className="form-label" for="login-email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="login-email"
                      value={agencyInformation.email}
                      name="email"
                      onChange={handleInputChange}
                      placeholder="Enter Your Email"
                      autoFocus
                      tabIndex="1"
                    />
                  </div>
                  <div className="mb-1">
                    <div className="d-flex justify-content-between">
                      <Label className="form-label" for="login-password">
                        Password
                      </Label>
                      <Link to="/forgot-password">
                        <small>Forgot Password?</small>
                      </Link>
                    </div>
                    <InputPasswordToggle
                      className="input-group-merge"
                      value={agencyInformation.password}
                      name="password"
                      onChange={handleInputChange}
                      id="login-password"
                      tabIndex="2"
                    />
                  </div>
                  <Button color="primary" block disabled={loading} tabIndex="3">
                    {loading ? (
                      <>
                        <Spinner color="white" size="sm" type="grow" />
                        <span className="ms-50">Loading...</span>
                      </>
                    ) : (
                      <span>Sign in</span>
                    )}
                  </Button>
                </Form>
                <p className="text-center mt-2">
                  <span className="me-25">New on our platform?</span>
                  <Link to="/customers/register" tabIndex="4">
                    <span>Create an account</span>
                  </Link>
                </p>
                <p className='text-center mt-2'>
                  <Link to='/catalogue' tabIndex="5">
                    <span className='align-middle'>Go to Catalogue</span>
                    <ChevronRight className='rotate-rtl me-25' size={14} />
                  </Link>
                </p>
              </Col>
            </Col>
          </Row>
      }
    </div>
  );
};

export default LoginCover;
