import React from "react";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import {
    Button,
    Row,
    Container,
    Image,
    Col
} from "react-bootstrap";
import imageMain from "../../assets/screenshots-main.png";

/**
 * HomePage is displaying the basic information of the app
 * Links for social media
 */

const HomePage = () => {


    return (
        <>
            <Row className={styles.Row}>
                <Col className="my-auto py-2 p-md-2" md={12} lg={8} sm={12}>
                    <Container className={`${appStyles.Content} p-4 `}>

                        <h1 className={styles.Header}>Welcome to Screenshot Organizer</h1>
                        <hr />
                        <center>
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                aria-label="Visit our Linkedin"
                                rel="noreferrer"
                            >
                                <i className="fa-brands fa-linkedin-in fa-2x" />
                            </a>

                            <a
                                href="https://www.youtube.com/"
                                target="_blank"
                                aria-label="Visit our YouTube area"
                                rel="noreferrer"
                            >
                                <i className="fa-brands fa-youtube fa-2x" />
                            </a>
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                aria-label="Visit our Twitter "
                                rel="noreferrer"
                            >
                                <i className="fa-brands fa-twitter fa-2x" />
                            </a>
                        </center>
                        <hr />
                        <h2>Screenshots are a fascinating phenomenon in the current digital age.</h2>
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
                    md={6} lg={4}
                    className={`my-auto d-none d-lg-block d-md-none p-2`}
                >

                    <Image
                        className={`${appStyles.FillerImage}`}
                        src={imageMain}
                    />
                    <div className={btnStyles.Aligncenter}>
                        <Button href="/"
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle}`}

                        >
                            Enter Now
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default HomePage;