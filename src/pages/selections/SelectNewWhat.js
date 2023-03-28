import React from "react";
import logo from "../../assets/logo.png";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import styles from "../../styles/SelectNewWhat.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { useRedirect } from "../../hooks/useRedirect";


function SelectNewWhat() {
    useRedirect("loggedOut");


    return (
        <>
            <Row className={styles.Row}>
                <Col md={{ span: 8, offset: 2 }} className="my-auto p-0 p-md-2">
                    <Container className={`${appStyles.Content} p-4 `}>
                        <h1 className={styles.Header}>Welcome to Creation Area</h1>
                        <p align="center"><img src={logo} alt="logo" height="90" align="center" /></p>
                        <hr />
                        <p align="center"><Badge variant="light"><span className={styles.Labels}>Screenshots</span></Badge> are a fascinating phenomenon in the digital age.
                            They capture a stolen moment in time that only you can see
                            on your computer screen, making it a <Badge variant="light"><span className={styles.Labels}>unique piece</span></Badge> of digital
                            art. The ability to <Badge variant="light"><span className={styles.Labels}>share this image</span></Badge> with the rest of the
                            world is a powerful concept that has the potential to <Badge variant="light"><span className={styles.Labels}>inspire</span></Badge>
                            , provoke thought, or even make someone <Badge variant="light"><span className={styles.Labels}>smile</span></Badge>.
                        </p>
                        <p align="center"> This Area allows you to create a new <Badge variant="light"><span className={styles.Labels}>public</span></Badge> screenshot,
                            which will be visible to all users of the app, including those who are not logged in.
                            In addition, you can also create a new <Badge variant="light"><span className={styles.Labels}>category</span></Badge>, which is similar to a folder.
                            To create a category, you'll need to provide a name, an avatar, and a description.
                            Once you've created a category, you can add new <Badge variant="light"><span className={styles.Labels}>private</span></Badge> screenshots to it by selecting
                            the appropriate category. Your dashboard will give you a view of all your Private screenshots, Check it out!


                        </p>
                    </Container>
                </Col>
            </Row>
            <Row className={`py-2 ${styles.Row}`}>
                <Col md={{ span: 8, offset: 2 }} className="my-auto p-0 p-md-2">
                    <Container className={`${appStyles.Content} p-4 `}>
                        <h1 className={styles.Header}>Want to create something new? Select which one</h1>

                        <div className={`${appStyles.AlignCenter} p-4 `}>
                            <NavLink className={styles.NavLink} to="/scrshot_private/create">
                                <i className="fa-solid fa-circle-plus fa-2x"></i>
                                <Badge variant="light"><span className={styles.Labels}>Private</span></Badge>
                            </NavLink>
                            <NavLink className={styles.NavLink} to="/scrshot_public/create">
                                <i className="fa-solid fa-plus fa-2x"></i>
                                <Badge variant="light"><span className={styles.Labels}>Public</span></Badge>
                            </NavLink>
                            <NavLink className={styles.NavLink} to="/category/create">
                                <i className="fa-solid fa-folder-plus fa-2x"></i>
                                <Badge variant="light"><span className={styles.Labels}>Category</span></Badge>
                            </NavLink>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button href="/"
                                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle}`}

                            >
                                I don't know, Need some inspiration!
                            </Button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </>
    );
}

export default SelectNewWhat;