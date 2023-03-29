import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Category from "./Category";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import btnStyles from "../../styles/Button.module.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
function ListAllCategoryPage({ message = "", filter = "" }) {


  const [category, setCategory] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axiosReq.get(`/category/?search=${query}&ordering=-private_screenshots_count&`);
        setCategory(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
        history.push("/Error");
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchCategory();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, history]);

 

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
      <Row>
        <Col sm={6} xs={6} lg={9}>
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
            placeholder="Category"
          />

        </Form>
        </Col>
        
      <Col lg={1} sm={3} xs={3} className="sm-py-2 d-lg-block"><Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Basic}`}
        onClick={() => setQuery("")}
      >
        Clear
      </Button></Col>{  }
        <Col lg={2} sm={3} xs={3} className="xs-py-2 d-lg-block">
        
        <NavLink className="align-items-center justify-content-between" to={`/category/create`} >

        <i className="fa-solid fa-circle-plus fa-2x"></i>

</NavLink>
</Col>
        </Row>


        {hasLoaded ? (
          <>
            {category.results.length ? (
              <InfiniteScroll
                children={category.results.map((cat) => (
                  <Category key={cat.id} {...cat} setCategory={setCategory} category={category} />
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

    </Row>
  );
}

export default ListAllCategoryPage;