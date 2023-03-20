import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router";
import styles from "../../styles/ScrShotCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import SelectCategory from "./SelectCategory";
import { useEffect } from "react";
import stylesIcon from "../../styles/MoreDropdown.module.css";
function ScrshotPrivateCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});




  const [ScrshotPrivateData, setScrshotPrivateData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    category_title: "",
  });
  const { title, content, category, image, category_title } = ScrshotPrivateData;




  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();


  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/private-scrshot/${id}/`);
        const { title, content, image, category, is_owner, category_title } = data;

        is_owner ? setScrshotPrivateData({ title, content, image, category, category_title }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    console.log(event.target[2].value)
    console.log(event.target[3].value)

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (imageInput?.current?.files[0]) {
        formData.append("image", imageInput.current.files[0]);
      }





    try {

      await axiosReq.put(`/private-scrshot/${id}/`, formData);
      
      /*history.push(`/private_scrshot/${data.id}`);*/
      history.push(`/ListScrshotPrivatePage`);

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
        <Form.Label ><Badge variant="light"><span className={styles.Labels}>Screenshot Name</span></Badge></Form.Label>

        <Form.Control
          className={`${styles.Input} ${styles.InputText}`}
          type="text"
          name="title"
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
          rows={6}
          name="content"
          maxLength={2048}
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <div key={idx} className={styles.bgwarning}>{message}</div>
      ))}







<SelectCategory ScrshotPrivateData={ScrshotPrivateData} setScrshotPrivateData={setScrshotPrivateData} category_id={category} category_title={category_title}  />

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
            <p className={stylesIcon.DropdownItem}><i className="fa-solid fa-lock fa-2x"></i></p>
            <Form.Group className="text-center justify-content-center">
              
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.PurpleStyle} btn`}
                      htmlFor="image-upload"
                    >
                      CHANGE THE IMAGE
                    </Form.Label>
                  </div>
                
             
              
              

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
