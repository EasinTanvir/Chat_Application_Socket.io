import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Log_Out } from "../store/actions";

const Navbars = () => {
  const dispatch = useDispatch();
  const {
    user: { token, userName },
  } = useSelector((state) => state.auth);

  const LogOutHandler = () => {
    localStorage.removeItem("user");
    dispatch(Log_Out());
  };

  setTimeout(() => {
    localStorage.removeItem("user");
    dispatch(Log_Out());
  }, 86400000);

  return (
    <header className="sticky-top">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <LinkContainer to="/">
            <Navbar.Brand>Messenger</Navbar.Brand>
          </LinkContainer>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!token && (
                <LinkContainer to="/auth">
                  <Nav.Link>Authonication</Nav.Link>
                </LinkContainer>
              )}
              {token && (
                <>
                  <LinkContainer to="/auth">
                    <Button onClick={LogOutHandler}>Log Out</Button>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navbars;
