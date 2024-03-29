import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import btnStyles from "../../styles/Button.module.css";
import ScrshotPrivate from "./ScrshotPrivate";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import AllCategory from "../category/AllCategory";
import { useRedirect } from "../../hooks/useRedirect";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/**
 * ListScrshotPrivatePage  Component is displaying 
 * the all private screenshot of the current logged user
 * */

function ListScrshotPrivatePage({ message = "", filter = "" }) {
  useRedirect("loggedOut");
  const [, setCategory] = useState({ results: [] });
  const [scrshots, setScrshots] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");
  const history = useHistory();
  useEffect(() => {
    const fetchScrshots = async () => {
      try {
        const [{ data: category }, { data: scrshots }] = await Promise.all([
          axiosReq.get(`/category/`),
          axiosReq.get(`/private-scrshot/?${filter}search=${query}`)
        ]);

        setScrshots(scrshots);
        setCategory(category);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
        history.push("/Error");
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchScrshots();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, history]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={9}>
        <AllCategory mobile />
        <Row>
          <Col sm={6} xs={8} lg={9}>
            <i className={`fas fa-search ${appStyles.SearchIcon}`} />
            <Form
              className={appStyles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                name="searchbar"
                id="searchbar"
                className="mr-sm-2"
                placeholder="Search a Screenshot"
              />

            </Form>
          </Col>
          <Col lg={3} sm={6} xs={4} className="sm-py-2 d-lg-block">
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Basic}`}
              onClick={() => setQuery("")}
            >
              Clear
            </Button>
          </Col>
        </Row>
        {hasLoaded ? (
          <>
            <p className={appStyles.MessagesInfo}>{scrshots.results.length} Screenshot(s) found in total.</p>
            {scrshots.results.length ? (
              <InfiniteScroll
                children={scrshots.results.map((scrshot) => (
                  <ScrshotPrivate key={scrshot.id} {...scrshot} setScrshots={setScrshots} setCategory={setCategory} />
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
      <Col md={4} className="d-none d-lg-block p-0 " lg={3}>
        <AllCategory setScrshots={setScrshots} setCategory={setCategory} />
      </Col>
    </Row>
  );


}

export default ListScrshotPrivatePage;