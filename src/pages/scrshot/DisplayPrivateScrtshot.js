import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router-dom";

/**
 * DisplayPrivateScrtshot  Component is displaying 
 * the selected private sceenshot in big size.
 * */
function DisplayPrivateScrtshot() {
  const { id } = useParams();
  const results = useState();
  const [Image, setImage] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/private-scrshot/${id}`);
        setImage(data.image);
      } catch (err) {
        console.log(err);
        history.push("/Error");
      }
    };
    handleMount();
  }, [results, id, history]);



  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Card>
          <Card.Img src={Image} alt={Image} height="80%" width="80%" />
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