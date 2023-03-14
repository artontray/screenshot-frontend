import React from "react";

import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";

import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Navbar'
import NavDropdown from "react-bootstrap/Navbar";

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



  const addPublicScreenshotIcon = (
    <NavLink className={styles.NavLink} to="/scrshot_public/create">
      <i className="fa-solid fa-plus fa-2x"></i>
      Add 
    </NavLink>
  );
  const addCategoryIcon = (
    <NavLink className={styles.NavLink} to="/category/create">
      <i className="fa-solid fa-folder-plus fa-2x"></i>
      New Category
    </NavLink>
  );

  const addPrivateScrshotIcon = (
    <NavLink className={styles.NavLink} to="scrshot_private/create">
      <i className="fa-solid fa-circle-plus fa-2x"></i>

    </NavLink>
  );

  const addPrivateDashboard = (
    <NavLink className={styles.NavLink} to="/ListScrshotPrivatePage">
      <i className="fa-solid fa-camera fa-2x"></i>

    </NavLink>
  );
  const addInspirationIcon = (
    <NavLink className={styles.NavLink} to="/ListFollowedUsersScrshot">
      <i className="fa-solid fa-camera fa-2x"></i>

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


<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

 
  );
};

export default NavBar;