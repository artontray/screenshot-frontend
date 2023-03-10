import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import ScrshotPublic from "./ScrshotPublic";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ListScrshotPublicPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import PopularProfiles from "../profiles/PopularProfiles";

function ListScrshotPublicPage({ message, filter = "" }) {


    const [scrshots, setScrshots] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
  
    const [query, setQuery] = useState("");
    
    useEffect(() => {
      const fetchScrshots = async () => {
        try {
          const { data } = await axiosReq.get(`/public-scrshot/?${filter}search=${query}`);
          setScrshots(data);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
      setHasLoaded(false);
      const timer = setTimeout(() => {
        fetchScrshots();
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }, [filter, query, pathname]);
  
    return (
        <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>

          <PopularProfiles mobile />
          <i className={`fas fa-search ${styles.SearchIcon}`} />
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search Screenshots"
            />
          </Form>
  
          {hasLoaded ? (
            <>
              {scrshots.results.length ? (
                <InfiniteScroll
                  children={scrshots.results.map((scrshot) => (
                    <ScrshotPublic key={scrshot.id} {...scrshot} setScrshots={setScrshots} />
                  ))}
                  dataLength={scrshots.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!scrshots.next}
                  next={() => fetchMoreData(scrshots, setScrshots)}
                />
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        </Col>
      </Row>
    );
}

export default ListScrshotPublicPage;