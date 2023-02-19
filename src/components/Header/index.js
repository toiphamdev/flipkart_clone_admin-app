import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../../redux/actions";
function Header(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <span onClick={logout} className="nav-link">
          Sign out
        </span>
      </Nav>
    );
  };
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <NavLink to="/signin" className="nav-link">
          Sign in
        </NavLink>
        <NavLink to="/signup" className="nav-link">
          Sign up
        </NavLink>
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
