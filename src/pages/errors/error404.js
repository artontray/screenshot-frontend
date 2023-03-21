import React from 'react';
import { Container } from 'react-bootstrap';

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import imagerror404 from "../../assets/error404.png";
import {
    Button,
    Row,
    Image,
    Col
} from "react-bootstrap";
/**
 * Display error graphic for non-existent pages.
 */
function Error404() {
    return (
        <Container>

            <Row>

                <Col
                    md={12} lg={12}
                    className={` d-lg-block  p-2`}
                >
                    <div className={`${btnStyles.Aligncenter} ${appStyles.MessagesInfo}`}>
                        <h1>Page Not Found!</h1>
                        <Image
                            className={`${appStyles.Image404} `}
                            src={imagerror404}
                        /></div>
                    <div className={btnStyles.Aligncenter}>
                        <Button href="/"
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle}`}

                        >
                            Go Back Home
                        </Button>
                    </div>
                </Col>
            </Row>



        </Container>
    );
}

export default Error404;