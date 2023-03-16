import React from "react";

import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Navbar'
import NavDropdown from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import {
  useCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";

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
  const addCategoryIcon = (
    <NavLink className={styles.NavLink} to="/category/create">
      <i className="fa-solid fa-folder-plus fa-2x"></i>
      Add Category
    </NavLink>
  );

  const addPrivateScrshotIcon = (
    <NavLink className={styles.NavLink} to="/scrshot_private/create">
      <i className="fa-solid fa-circle-plus fa-2x"></i>
      Private New
    </NavLink>
  );

  const addPrivateDashboard = (
    <NavLink className={styles.NavLink} to="/ListScrshotPrivatePage">
      <i className="fa-solid fa-camera fa-2x"></i>

    </NavLink>
  );
  const addInspirationIcon = (
    <NavLink className={styles.NavLink} to="/ListFollowedUsersScrshot">
      <i className="fa-solid fa-people-group fa-2x"></i>
  

    </NavLink>
  );
  const addLikedIcon = (
    <NavLink className={styles.NavLink} to="/ListLikedPublicScrshot">
      <i className="fa-solid fa-heart fa-2x"></i>

    </NavLink>
  );
  const ProfileIcons = (
    <NavLink
      className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`} >
      <Navbar.Brand >
      <Avatar src={currentUser?.profile_image} height={40} />
      </Navbar.Brand>
    </NavLink>

  );
  const addHomeIcon = (
    <NavLink className={styles.NavLink} to="/">
      <i className="fas fa-home fa-2x"></i>

    </NavLink>
  );
  const addSearchingIcon = (
    <NavLink className={styles.NavLink} to="/ListScrshotPrivatePage">
      <i className="fa-solid fa-magnifying-glass fa-2x"></i>

    </NavLink>
  );


  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink} to="/signin">
        <i className="fa-solid fa-arrow-right-to-bracket fa-2x"></i>

      </NavLink>
      <NavLink
        className={styles.NavLink} to="/signup">
        <i className="fas fa-user-plus fa-2x"></i>
      </NavLink>
    </>
  );



  return (


<Navbar className={styles.NavBar} expanded={expanded} expand="md" fixed="top" expand="lg">

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