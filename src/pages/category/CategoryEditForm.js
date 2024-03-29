import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Upload from "../../assets/upload.png";
import styles from "../../styles/CategoryCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import Asset from "../../components/Asset";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useParams } from "react-router";

/**
 * 
 * CategoryEditForm component is used to edit a category
 * 
 */

function CategoryEditForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [CategoryData, setCategoryData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const { title, description, image } = CategoryData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  /**
   * 
   * Populate form fields with previously inserted data.
   * 
   */
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/category/${id}/`);
        const { title, description, image, is_owner } = data;

        is_owner ? setCategoryData({ title, description, image }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);



  const handleChange = (event) => {
    setCategoryData({
      ...CategoryData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {

    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setCategoryData({
        ...CategoryData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  /**
 * 
 * Submit the form with edited data
 * After submitting, redirection to /category/id
 */

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    if (imageInput?.current?.files[0]) {
      //not existing image selection
      formData.append("image", imageInput.current.files[0]);
    }


    try {
      await axiosReq.put(`/category/${id}/`, formData);
      history.push(`/category/${id}/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label ><Badge variant="light"><span className={styles.Labels}>Category name</span></Badge></Form.Label>

        <Form.Control
          className={`${styles.Input} ${styles.InputText}`}
          type="text"
          name="title"
          maxLength={12}
          value={title}
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
          rows={10}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
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
        Save
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
            <Badge variant="light"><span className={styles.Labels}>Edit Category Area</span></Badge>
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
                    message="Click to upload an Image for this Category"
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

export default CategoryEditForm;