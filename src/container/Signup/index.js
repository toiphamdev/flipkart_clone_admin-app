import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { singup } from "../../redux/actions";

function Signup() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userSignup = (e) => {
    e.preventDefault();
    const user = { email, password, lastName, firstName };
    dispatch(singup(user));
  };
  if (auth.authenticate) {
    return <Navigate to="/" />;
  }
  if (user.loading) {
    return <p>Loading ...</p>;
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    type="text"
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    type="text"
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
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
