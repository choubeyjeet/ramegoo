import { Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="#" as={Link} to="/home">
          SHOPLANEE
        </Navbar.Brand>
        <Nav>
          <Nav.Item icon={<HomeIcon />} as={Link} to="/home">
            Home
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};
