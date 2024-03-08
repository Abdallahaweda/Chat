import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const NAv = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4 ">
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Chat
          </Link>
        </h2>
        {user && (
          <span className="text-warning">Logged in as {user?.name}</span>
        )}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NAv;
