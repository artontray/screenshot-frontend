import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Upload from "../../assets/upload.png";
import styles from "../../styles/ScrShotCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import SelectCategory from "./SelectCategory";
/**
 * ScrshotPrivateCreateForm function is displaying 
 * a Form for User to add a new Private Screenshot
 * */
function ScrshotPrivateCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [ScrshotPrivateData, setScrshotPrivateData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const { title, content, category, image } = ScrshotPrivateData;
  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setScrshotPrivateData({
      ...ScrshotPrivateData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setScrshotPrivateData({
        ...ScrshotPrivateData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
 * Submit the form and creation of a new private screenshot
 * */
  const handleSubmit = async (event) => {
    event.preventDefault();


    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", imageInput.current.files[0]);

    try {
      await axiosReq.post("/private-scrshot/", formData);
      history.push(`/category/${category}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
      if (err.response?.status === 400) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label ><Badge variant="light"><span className={styles.Labels}>Screenshot Name</span></Badge></Form.Label>
        <Form.Control
          className={`${styles.Input} ${styles.InputText}`}
          type="text"
          name="title"
          value={title}
          maxLength={25}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <div key={idx} className={styles.bgwarning}>{message}</div>
      ))}
      <Form.Group>
        <Form.Label><Badge variant="light"><span className={styles.Labels}>Describe it!</span></Badge></Form.Label>
        <Form.Control
          className={`${styles.Input} ${styles.InputTextarea}`}
          as="textarea"
          rows={6}
          maxLength={2048}
          name="content"
          value={content}
          onChange={handleChange}

        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <div key={idx} className={styles.bgwarning}>{message}</div>
      ))}


      <SelectCategory ScrshotPrivateData={ScrshotPrivateData} setScrshotPrivateData={setScrshotPrivateData} />
      {errors?.category?.map((message, idx) => (
        <div key={idx} className={styles.bgwarning}>{message}</div>
      ))}
      <Button variant="light"
        className={`${btnStyles.Button} ${btnStyles.PurpleStyle}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button variant="light"
        className={`${btnStyles.Button} ${btnStyles.PurpleStyle}`} type="submit">
        Publish
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Badge variant="light"><span className={styles.Labels}>New Private Screenshot Area</span></Badge>
            <hr />
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.PurpleStyle} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click to upload a Screenshot!"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
              {errors?.image?.map((message, idx) => (
                <div key={idx} className={styles.bgwarning}>{message}</div>
              ))}
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ScrshotPrivateCreateForm;
