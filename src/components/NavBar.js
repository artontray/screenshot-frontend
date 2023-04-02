import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import {
  useCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";

/**
 * 
 * NavBar component is used to display a NavBar menu always on top of the App
 * The NavBar will be displaying differents icons according the User status (connected or not)
 * If screen become too small, the NavBar will be converted to Burger Icon
 */


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();


  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };




  const addLogoutIcon = (
    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
      <i className="fa-solid fa-power-off fa-2x"></i>
      Logout
    </NavLink>
  );

  const addNewIcon = (
    <NavLink className={styles.NavLink} to="/SelectNewWhat">
      <i className="fa-solid fa-plus fa-2x"></i>
      New
    </NavLink>
  );

  const addInspirationIcon = (
    <NavLink className={styles.NavLink} to="/ListFollowedUsersScrshot">
      <i className="fa-solid fa-people-group fa-2x"></i>
      Community

    </NavLink>
  );

  const addLikedIcon = (
    <NavLink className={styles.NavLink} to="/ListLikedPublicScrshot">
      <i className="fa-solid fa-heart fa-2x"></i>
      Favorites
    </NavLink>
  );

  const ProfileIcons = (
    <NavLink
      className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`} >
      <Navbar.Brand >
        <Avatar src={currentUser?.profile_image} height={50} />
      </Navbar.Brand>
    </NavLink>
  );

  const addHomeIcon = (
    <NavLink className={styles.NavLink} to="/home">
      <i className="fas fa-home fa-2x"></i>
      Home
    </NavLink>
  );

  const addNewsIcon = (
    <NavLink className={styles.NavLink} to="/">
      <i className="fa-solid fa-camera fa-2x"></i>
      News
    </NavLink>
  );

  const addSearchingIcon = (
    <NavLink className={styles.NavLink} to="/ListScrshotPrivatePage">
      <i className="fa-solid fa-screwdriver-wrench fa-2x"></i>

      Dashboard
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink} to="/signin">
        <i className="fa-solid fa-arrow-right-to-bracket fa-2x"></i>
        Sign In
      </NavLink>
      <NavLink
        className={styles.NavLink} to="/signup">
        <i className="fas fa-user-plus fa-2x"></i>
        Sign Up
      </NavLink>
    </>
  );



  return (
    <Navbar className={styles.NavBar} expanded={expanded} expand="md" fixed="top">
      <Container>
        {currentUser && ProfileIcons}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="mr-auto text-left">
            {currentUser && addNewIcon}
            {currentUser && addLikedIcon}
            {currentUser && addInspirationIcon}
            {currentUser && addSearchingIcon}
            {addNewsIcon}
            {addHomeIcon}
          </Nav>
          <Nav className="ml-auto text-left">
            {currentUser ? addLogoutIcon : loggedInIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;