import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import ScrshotPublic from "./ScrshotPublic"
function ScrshotPublicPage() {
  const { id } = useParams();
  const [scrshot, setScrshot] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: scrshot }] = await Promise.all([
          axiosReq.get(`/public-scrshot/${id}`),
        ]);
        setScrshot({ results: [scrshot] });
        console.log(scrshot);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <ScrshotPublic {...scrshot.results[0]} setScrshots={setScrshot} scrshotPage />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default ScrshotPublicPage;