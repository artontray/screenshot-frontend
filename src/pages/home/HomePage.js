import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import logo from "../../assets/logo.png";
import imageMain from "../../assets/screenshots-main.png";
import {
    Form,
    Button,
    Image,
    Col,
    Row,
    Container,
    Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";


const HomePage = () => {

    const history = useHistory();
    return (
        <Row className={styles.Row}>
            <Col className="my-auto py-2 p-md-2" md={12} lg={6} sm={12}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>Welcome to Screenshot Organizer</h1>


                    <h2>Screenshots are a fascinating phenomenon in the digital age.</h2>
                    <br />
                    <p >
                        They capture a stolen moment in time that only you can see on
                        your computer screen, making it a unique piece of digital art.
                        The ability to share this image with the rest of the world is
                        a powerful concept that has the potential to inspire, provoke
                        thought, or even make someone smile.
                    </p>
                    <hr />
                    <p>
                        In a world where we are constantly bombarded with information,
                        a screenshot can capture a specific moment that resonates with
                        us in a personal way. It can evoke a range of emotions and stir
                        up memories that we may have forgotten. It's a visual snapshot
                        of our digital lives that we can choose to keep private or share
                        with others.
                    </p>
                    <hr />
                    <p>
                        The act of taking a screenshot is a form of creative expression,
                        capturing an instant in time that can never be replicated.
                        It's a reflection of who we are and the world we inhabit,
                        offering a glimpse into our digital experiences.
                    </p>
                    <hr />
                    <p>
                        So, whether it's a funny meme, a touching message from a loved one,
                        or an inspirational quote, a screenshot has the power to bring people
                        together and create a shared experience. It's a testament to the power
                        of technology and a such of unique ways in which it allows us to
                        connect and express ourselves.

                    </p>



                </Container>


            </Col>
            <Col
                md={6} lg={6} 
                className={`my-auto d-none d-lg-block d-md-none p-2`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={imageMain}
                />
            </Col>
        </Row>
    );
};

export default HomePage;