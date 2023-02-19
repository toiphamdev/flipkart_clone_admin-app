import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./style.css";

function Layout(props) {
  return (
    <>
      {props.sidebar ? (
        <>
          <Header />
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
                <ul>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/category">Category</NavLink>
                  </li>

                  <li>
                    <NavLink to="/products">Products</NavLink>
                  </li>
                  <li>
                    <NavLink to="/page">Page</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orders">Orders</NavLink>
                  </li>
                </ul>
              </Col>
              <Col md={10} style={{ marginLeft: "auto" }}>
                {props.children}
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Header />
          {props.children}
        </>
      )}
    </>
  );
}

export default Layout;
