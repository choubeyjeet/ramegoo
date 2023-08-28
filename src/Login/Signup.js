import {
  Navbar,
  Row,
  Col,
  Grid,
  Form,
  Button,
  Schema,
  ButtonToolbar,
} from "rsuite";
import "./assets/css/login.css";
import { Country, State, City } from "country-state-city";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Signup = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("");

  const [isCountry, setIsCountry] = useState(false);
  const [isState, setIsState] = useState(false);
  const [isCity, setIsCity] = useState(false);
  const [isPassword, setPassword] = useState(false);

  const [formValue, setFormVaue] = useState({
    fname: "",
    lname: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    password: "",
    confirm: "",
    mobile: "",
  });

  const { StringType, NumberType } = Schema.Types;
  const model = Schema.Model({
    fname: StringType().isRequired("This field is required."),
    address: StringType().isRequired("This field is required."),
    country: StringType().isRequired("This field is required."),
    pincode: NumberType("Please enter a valid number.")
      .pattern(/^\d+$/, "Please enter a valid number")
      .isRequired("This field is required."),
    mobile: NumberType("Please enter a valid number.")
      .pattern(/^\d+$/, "Please enter a valid mobile number")
      .isRequired("This field is required."),
    email: StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required."),
    ieg: StringType().isRequired("This field is required."),
    password: StringType()
      .isRequired("This field is required.")
      .addRule(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ),
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    confirm: StringType().isRequired("This field is required."),
  });

  useEffect(() => {
    const countryList = Country.getAllCountries();

    const nameC = countryList
      .map((name) => {
        return { name: name.name, isoC: name.isoCode };
      })
      .map((item) => ({ label: item.name, value: item.isoC }));
    setCountry(nameC);
  }, []);

  const onSelectSetStates = (e) => {
    setIsCountry(false);
    const states = State.getStatesOfCountry(e);
    setselectedCountry(e);

    const nameC = states
      .map((name) => {
        return { name: name.name, isoC: name.isoCode };
      })
      .map((item) => ({ label: item.name, value: item.isoC }));
    setState(nameC);
  };

  const onSelectSetCities = (e) => {
    setIsState(false);
    const cities = City.getCitiesOfState(selectedCountry, e);

    const city = cities
      .map((name) => {
        return { name: name.name };
      })
      .map((item) => ({ label: item.name }));
    setCity(city);
  };
  const onSelectSetC = (e) => {
    setIsCity(false);
  };

  const navigate = useNavigate();
  const sumbitForm = () => {
    // console.log(formValue.country);
    if (formValue.country === "") {
      setIsCountry(true);
    }
    if (formValue.state === "") {
      setIsState(true);
    }
    if (formValue.city === "") {
      setIsCity(true);
    }

    if (formValue.password !== formValue.confirm) {
      setPassword(true);
    }

    if (
      formValue.fname !== "" &&
      formValue.email !== "" &&
      formValue.address !== "" &&
      formValue.city !== "" &&
      formValue.state !== "" &&
      formValue.country !== "" &&
      formValue.pincode !== "" &&
      formValue.password !== "" &&
      formValue.confirm !== "" &&
      formValue.mobile !== ""
    ) {
      if (formValue.password === formValue.confirm) {
        localStorage.setItem("email", formValue.email);
        localStorage.setItem("password", formValue.password);
        toast("Signup Successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } else {
      return false;
    }
  };

  const setForm = (name, e) => {
    setFormVaue({ ...formValue, [name]: e });
  };

  return (
    <>
      <Navbar appearance="inverse" style={{ padding: 25 }}></Navbar>

      <Grid fluid>
        <Row className="show-grid">
          <Col md={2}></Col>
          <Col md={8}></Col>
          <Col md={12}>
            <Form style={{ marginTop: 30 }} model={model}>
              <br />
              <Row style={{ marginBottom: 30 }}>
                <Col md={24}>
                  <ButtonToolbar>
                    <Button
                      as={Link}
                      to="/login"
                      style={{ width: "48%" }}
                      appearance="default"
                    >
                      Login
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      style={{ width: "48%" }}
                      appearance="primary"
                      active
                    >
                      Sign Up
                    </Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.ControlLabel>First Name* </Form.ControlLabel>
                    <Form.Control
                      name="fname"
                      placeholder="First Name"
                      onChange={(e) => {
                        setForm("fname", e);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={1}></Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.ControlLabel>Last Name </Form.ControlLabel>
                    <Form.Control
                      name="lname"
                      placeholder="Last Name"
                      onChange={(e) => {
                        setForm("lname", e);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={24}>
                  {" "}
                  <Form.Group controlId="email" className="inputUser">
                    <Form.ControlLabel>Email*</Form.ControlLabel>
                    <Form.Control
                      name="email"
                      type="email"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setForm("email", e);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={24}>
                  {" "}
                  <Form.Group
                    className="inputUser"
                    controlId="email"
                    style={{ width: "100%" }}
                  >
                    <Form.ControlLabel>Address*</Form.ControlLabel>
                    <Form.Control
                      name="address"
                      type="text"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setForm("address", e);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <br />
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.ControlLabel>Country* </Form.ControlLabel>

                    <select
                      className="rs-input"
                      onChange={(e) => {
                        onSelectSetStates(e.target.value);
                        setForm("country", e.target.value);
                      }}
                    >
                      <option value="">--Please select Country--</option>
                      {country.map((item, index) => {
                        return (
                          <>
                            <option value={`${item.value}`} key={index}>
                              {item.label}
                            </option>
                          </>
                        );
                      })}
                    </select>

                    {isCountry && (
                      <div
                        id="undefined-error-message"
                        role="alert"
                        aria-relevant="all"
                        className="rs-form-control-message-wrapper rs-form-error-message-wrapper rs-form-error-message-placement-bottom-start"
                      >
                        <span className="rs-form-error-message rs-form-error-message-show">
                          <span className="rs-form-error-message-arrow"></span>
                          <span className="rs-form-error-message-inner">
                            This field is required.
                          </span>
                        </span>
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={1}></Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.ControlLabel>State* </Form.ControlLabel>

                    <select
                      className="rs-input"
                      onChange={(e) => {
                        onSelectSetCities(e.target.value);
                        setForm("state", e.target.value);
                      }}
                    >
                      <option value="">--Please select State--</option>
                      {state.map((item, index) => {
                        return (
                          <>
                            <option value={`${item.value}`} key={index}>
                              {item.label}
                            </option>
                          </>
                        );
                      })}
                    </select>

                    {isState && (
                      <div
                        id="undefined-error-message"
                        role="alert"
                        aria-relevant="all"
                        className="rs-form-control-message-wrapper rs-form-error-message-wrapper rs-form-error-message-placement-bottom-start"
                      >
                        <span className="rs-form-error-message rs-form-error-message-show">
                          <span className="rs-form-error-message-arrow"></span>
                          <span className="rs-form-error-message-inner">
                            This field is required.
                          </span>
                        </span>
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.ControlLabel>City* </Form.ControlLabel>

                    <select
                      className="rs-input"
                      onChange={(e) => {
                        onSelectSetC(e.target.value);
                        setForm("city", e.target.value);
                      }}
                    >
                      <option value="">--Please select State--</option>
                      {city.map((item, index) => {
                        return (
                          <>
                            <option value={`${item.label}`} key={index}>
                              {item.label}
                            </option>
                          </>
                        );
                      })}
                    </select>

                    {isCity && (
                      <div
                        id="undefined-error-message"
                        role="alert"
                        aria-relevant="all"
                        className="rs-form-control-message-wrapper rs-form-error-message-wrapper rs-form-error-message-placement-bottom-start"
                      >
                        <span className="rs-form-error-message rs-form-error-message-show">
                          <span className="rs-form-error-message-arrow"></span>
                          <span className="rs-form-error-message-inner">
                            This field is required.
                          </span>
                        </span>
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={1}></Col>
                <Col md={12}>
                  <Form.Group className="inputUser">
                    <Form.ControlLabel>Pincode* </Form.ControlLabel>
                    <Form.Control
                      name="pincode"
                      type="text"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setForm("pincode", e);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <Row>
                <Col md={24}>
                  {" "}
                  <Form.Group
                    className="inputUser"
                    controlId="email"
                    style={{ width: "100%" }}
                  >
                    <Form.ControlLabel>Mobile Number*</Form.ControlLabel>
                    <Form.Control
                      name="mobile"
                      type="text"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setForm("mobile", e);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <br />
              <Row>
                <Col md={24}>
                  {" "}
                  <Form.Group
                    className="inputUser"
                    controlId="email"
                    style={{ width: "100%" }}
                  >
                    <Form.ControlLabel>Password*</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="text"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setForm("password", e);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <br />
              <Row>
                <Col md={24}>
                  {" "}
                  <Form.Group
                    className="inputUser"
                    controlId="email"
                    style={{ width: "100%" }}
                  >
                    <Form.ControlLabel>Confirm Password*</Form.ControlLabel>
                    <Form.Control
                      name="confirm"
                      type="text"
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setPassword(false);
                        setForm("confirm", e);
                      }}
                    />
                    {isPassword && (
                      <div
                        id="undefined-error-message"
                        role="alert"
                        aria-relevant="all"
                        className="rs-form-control-message-wrapper rs-form-error-message-wrapper rs-form-error-message-placement-bottom-start"
                      >
                        <span className="rs-form-error-message rs-form-error-message-show">
                          <span className="rs-form-error-message-arrow"></span>
                          <span className="rs-form-error-message-inner">
                            Password Doesn't match.
                          </span>
                        </span>
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Col md={24}>
                  <ButtonToolbar>
                    <Button
                      appearance="primary"
                      color="green"
                      style={{ width: "100%" }}
                      type="submit"
                      onClick={sumbitForm}
                    >
                      SIGNUP
                    </Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Grid>
      <ToastContainer />
    </>
  );
};
