import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useParams } from "react-router";
import styles from "../../styles/ListScrshotPublicPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";
function DisplayPrivateScrtshot() {
  const { id } = useParams();
  const results = useState();
  const [Image, setImage] = useState(null);
  let [data] = useState({ results: [] });
  const history = useHistory();
  useEffect(() => {
    const handleMount = async () => {
      console.log(id);
      try {
        data = await axiosReq.get(`/private-scrshot/${id}`);
        console.log(data.data.image);
        setImage(data.data.image);
      } catch (err) {
        console.log(err);
        history.push("/");
      }
    };
  
    handleMount();
  }, [results]);


    
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>


  
      <Card>

   <Card.Img src={Image} alt={Image} height="80%" width="80%"/>


       



            
      

   
      </Card>
        <hr />
      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Basic}`}
        onClick={() => history.goBack()}
      >
        BACK
      </Button>
      </Col>

    </Row>
  );
}

export default DisplayPrivateScrtshot;