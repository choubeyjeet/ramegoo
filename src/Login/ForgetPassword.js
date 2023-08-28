import { Link } from "react-router-dom";
import { Grid, Col, Row, Container, Form, ButtonToolbar, Button } from "rsuite";

export const ForgetPassword = () => {
  return (
    <>
      <Container style={{ background: "#007fff", height: "100vh" }}>
        <div class="center-div">
          <Form>
            <Form.Group controlId="name">
              <Form.ControlLabel>
                Please Provide your registred email id to reset the password.
                <br />
                <br />
              </Form.ControlLabel>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email Address"
              />
            </Form.Group>
            <ButtonToolbar style={{ textAlign: "center" }}>
              <Button
                style={{ width: "40%" }}
                as={Link}
                to="/login"
                appearance="primary"
              >
                Reset Password
              </Button>
              <Button
                style={{ width: "40%" }}
                appearance="primary"
                as={Link}
                to="/signup"
              >
                Login
              </Button>
            </ButtonToolbar>
          </Form>
        </div>
      </Container>
    </>
  );
};
