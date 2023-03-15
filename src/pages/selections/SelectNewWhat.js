import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import logo from "../../assets/logo.png";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SelectNewWhat.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";
function SelectNewWhat() {

    const setCurrentUser = useSetCurrentUser();

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            history.goBack();
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <Row className={styles.Row}>
                <Col md={{ span: 8, offset: 2 }} className="my-auto p-0 p-md-2">
                    <Container className={`${appStyles.Content} p-4 `}>
                        <h1 className={styles.Header}>Welcome to Creation Area</h1>
                        <p align="center"><img src={logo} alt="logo" height="90" />
                            - Adding a public screenshot will Add
                            - You can add a category which are like folder like stuf dfjs fdsjp
                            - You can add a private screenshot<hr />
                            Make your selection
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
                        <Button href="/ListFollowedUsersScrshot"
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle}`}
                            
                        >
                            I DON'T KNOW, I WANT SOME INSPIRATION
                        </Button>
                       
                    </Container>
                </Col>
            </Row>
        </>
    );
}

export default SelectNewWhat;