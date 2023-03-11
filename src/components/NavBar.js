import React from "react";
import { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { CurrentUserContext } from "../App";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import {
  useCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };


  const loggedInIcons = (
    <>


      <NavLink
        className={styles.NavLink}



        to="/"
      >
        <OverlayTrigger placement="bottom"
          overlay={<Tooltip>Dashboard</Tooltip>}
        >
          <i className="fa-solid fa-address-card fa-2x"></i>

        </OverlayTrigger>
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <OverlayTrigger placement="bottom"
          overlay={<Tooltip>Sign Out</Tooltip>}
        >
          <i className="fa-solid fa-power-off fa-2x"></i>

        </OverlayTrigger>
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}

        to="/signin"
      >
        <OverlayTrigger placement="bottom"
          overlay={<Tooltip>Sign in</Tooltip>}
        >
          <i className="fa-solid fa-play fa-2x"></i>

        </OverlayTrigger>
      </NavLink>


      <NavLink
        className={styles.NavLink}

        to="/signup"
      >
        <OverlayTrigger placement="bottom"
          overlay={<Tooltip>Sign up</Tooltip>}
        >
          <i className="fas fa-user-plus fa-2x"></i>
        </OverlayTrigger>
      </NavLink>
    </>
  );



  return (
    <Navbar className={styles.NavBar} fixed="top">
      <Container>



        <Nav className="col-md-6 ml-md-auto">
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/"
          >
            <OverlayTrigger placement="bottom"
              overlay={<Tooltip>Home Page</Tooltip>}
            >
              <i className="fas fa-home fa-2x color"></i>

            </OverlayTrigger>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </NavLink>





        </Nav>

      </Container>
    </Navbar>
  );
};

export default NavBar;