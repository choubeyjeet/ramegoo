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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export const Login = () => {
  const [formValue, setFormVaue] = useState({
    email: "",
    password: "",
  });

  const { StringType } = Schema.Types;
  const model = Schema.Model({
    email: StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required."),
    password: StringType().isRequired("This field is required."),
  });

  const setForm = (name, e) => {
    setFormVaue({ ...formValue, [name]: e });
  };

  const navigate = useNavigate();
  const sumbitForm = () => {
    const { email, password } = formValue;
    const emailL = localStorage.getItem("email");
    const passwordL = localStorage.getItem("password");

    if (email === emailL && password === passwordL) {
      navigate("/home");
    } else {
      toast.error("Email and password do not match.");
    }
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
                      appearance="primary"
                    >
                      Login
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      style={{ width: "48%" }}
                      appearance="default"
                      active
                    >
                      Sign Up
                    </Button>
                  </ButtonToolbar>
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
                      LOGIN
                    </Button>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row style={{ float: "right", marginTop: 10 }}>
                <Col>
                  <Link to="/forgetpassword">Forgot Password</Link>
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
