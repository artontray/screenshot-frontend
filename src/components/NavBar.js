import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";

import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";


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


  const addCategoryIcon = (
    <NavLink
      className={styles.NavLink}
      to="/category/create"
    >



        <i className="fa-regular fa-image fa-2x"></i>
      
      ADD CAT
    </NavLink>
  );

  const addNewPrivateScrshotIcon = (
    <NavLink
      className={styles.NavLink}
      to="/scrshot_private/create"
    >



        <i className="fa-regular fa-image fa-2x"></i>


      ADD P. SCR
    </NavLink>
  );

  

  const ListAllPrivateScrshotIcon = (
    <NavLink
      className={styles.NavLink}
      to="/ListScrshotPrivatePage"
    >



        <i className="fa-regular fa-image fa-2x"></i>


      LISTALL
    </NavLink>
  );

  

  const addPublicScreenshotIcon = (
    <NavLink
      className={styles.NavLink}
      to="/scrshot_public/create"
    >



        <i className="fa-regular fa-image fa-2x"></i>


      fds
    </NavLink>
  );

  const addLogoutIcon = (
    <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>

        <i className="fa-solid fa-power-off fa-2x"></i>


      fds
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/ListFollowedUsersScrshot"
      >
        <i className="fas fa-stream"></i>Feed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/ListLikedPublicScrshot"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>

      <NavLink
        className={styles.NavLink}



        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />

          <i className="fa-solid fa-address-card fa-2x"></i>

        fds
      </NavLink>





    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}

        to="/signin"
      >

          <i className="fa-solid fa-play fa-2x"></i>


        fds
      </NavLink>


      <NavLink
        className={styles.NavLink}

        to="/signup"
      >

          <i className="fas fa-user-plus fa-2x"></i>

        fds
      </NavLink>
    </>
  );



  return (
    <Navbar className={styles.NavBar} fixed="top">
      <Container>
      {currentUser && addPublicScreenshotIcon}
        {currentUser && addCategoryIcon}
        {currentUser && ListAllPrivateScrshotIcon}
        {currentUser && addNewPrivateScrshotIcon}
        


        <Nav className="col-md-6 ml-md-auto">
        <NavLink
            className={styles.NavLink}
            to="/"
          >

              <i className="fas fa-home fa-2x"></i>

           
            fds
           
          </NavLink>
          {currentUser ? loggedInIcons : loggedOutIcons}



        </Nav>
        {currentUser && addLogoutIcon}
      </Container>
    </Navbar>
  );
};

export default NavBar;