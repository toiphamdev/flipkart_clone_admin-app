import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { login } from "../../redux/actions";

function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();
    console.log("ok");
    const user = { email, password };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                type="email"
                label="Email address"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errMessage="We'll never share your email with anyone else."
              />

              <Input
                type="text"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup;
