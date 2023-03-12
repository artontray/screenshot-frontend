import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import logo from "../../assets/logo.png";
import Card from 'react-bootstrap/Card'
import { useRedirect } from "../../hooks/useRedirect";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import axios from "axios";


const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col md={{ span: 8, offset: 2 }} className="my-auto p-0 p-md-2">
        <Container className={`${appStyles.Content} p-4 `}>
          
          <h1 className={styles.Header}>Welcome to Screenshot Organizer</h1>
          <p align="center"><img src={logo} alt="logo" height="90"/></p>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <div key={idx} className={styles.bgwarning}>{message}</div>
            ))}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <div key={idx} className={styles.bgwarning}>{message}</div>
            ))}

            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              

                <div key={idx} className={styles.bgwarning}>{message}</div>
              
            ))}

            <Button variant="light"
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle}`}
              type="submit"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <div key={idx} className={styles.bgwarning}>{message}</div>
            ))}
          </Form>
        </Container>

        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? 
            <Badge variant="light"><span>Sign in</span></Badge>
          </Link>
        </Container>
      </Col>

    </Row>
  );
};

export default SignUpForm;