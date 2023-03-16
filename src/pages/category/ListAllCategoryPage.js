import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Category from "./Category";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/ListScrshotPublicPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import AllCategory from "../category/AllCategory";
import btnStyles from "../../styles/Button.module.css";

function ListAllCategoryPage({ message = "", filter = "" }) {


  const [category, setCategory] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axiosReq.get(`/category/?search=${query}&ordering=-private_screenshots_count&`);
        setCategory(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchCategory();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>

        <AllCategory mobile />
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
            placeholder="Search a Category"
          />

        </Form>


        {hasLoaded ? (
          <>
            {category.results.length ? (
              <InfiniteScroll
                children={category.results.map((cat) => (
                  <Category key={cat.id} {...cat} setCategory={setCategory} />
                ))}
                dataLength={category.results.length}
                loader={<Asset spinner />}
                hasMore={!!category.next}
                next={() => fetchMoreData(category, setCategory)}
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
        <AllCategory />
      </Col>
    </Row>
  );
}

export default ListAllCategoryPage;