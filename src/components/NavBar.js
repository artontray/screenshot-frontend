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

      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
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
        activeClassName={styles.Active}
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
              <i className="fas fa-home fa-2x"></i>

            </OverlayTrigger>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </NavLink>





        </Nav>

      </Container>
    </Navbar>
  );
};

export default NavBar;