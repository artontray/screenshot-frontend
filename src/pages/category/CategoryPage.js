import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Badge from "react-bootstrap/Badge";
import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import styles from "../../styles/CategoryPage.module.css";
import { useParams } from "react-router";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import NoResults from "../../assets/no-results.png";
import ScrshotPrivate from "../scrshot/ScrshotPrivate";
import AllCategory from "../category/AllCategory";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
function CategoryPage(filter = "") {


  const { id } = useParams();
  const [category, setCategory] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scrshots, setScrshots] = useState({ results: [] });
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: category }, { data: scrshots }] = await Promise.all([
          axiosReq.get(`/category/${id}`),
          axiosReq.get(`/private-scrshot/?category=${id}&search=${query}&`),
        ]);
        setCategory({ results: [category] });
        
        setScrshots(scrshots);
        

        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      handleMount();
    
    }, 1000);
    return () => {
      clearTimeout(timer);
      
    };


    
  }, [id,filter, query, pathname]);









  const mainCategory = (
    <>
      
      <Row noGutters className="px-3 text-center">
      <Col lg={3} className=" no-gutters ml-auto">
        <div className="d-flex align-items-center">
        <NavLink className={styles.NavLink} to={`/category/${id}/edit`} >

              <i className="fa-solid fa-pen-to-square fa-2x"></i>

            </NavLink>
            <NavLink className={styles.NavLink} to={`/scrshot_private/create`} >

              <i className="fa-solid fa-circle-plus fa-2x"></i>

            </NavLink>
              </div>
</Col>
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.CategoryImage}
            roundedCircle
            src={category.results[0]?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{category.results[0]?.title}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
            <i className="fa-solid fa-camera fa-3x"></i>
          <h1>{
            
            category.results[0]?.private_screenshots_count
          } </h1>
            </Col>
            
          </Row>

        </Col>
        
        {category.results[0]?.description && <Col className="p-3">{category.results[0]?.description}</Col>}
      </Row>
    </>
  );

  const maincategoryScrshots = (
    <>
      <hr />
      <p className="text-center">Screenshot(s) from category <Badge variant="light" className="text-center"><span className={styles.Labels}>{category.results[0]?.title}</span></Badge></p>
      <hr />
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
        <Asset
          src={NoResults}
          message={

            `No results found in this Category :  ${category.results[0]?.title}`
        }

        />
      )}

    </>
  );




  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={9}>
      <AllCategory mobile  />
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
            placeholder="Screenshot"
          />

        </Form>
        </Col>
        <Col lg={3} sm={6} xs={4} className="sm-py-2 d-lg-block"><Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Basic}`}
        onClick={() => setQuery("")}
      >
        Clear
      </Button></Col>
        </Row>



        


          {hasLoaded ? (
            <>
            <Container className={appStyles.Content}>
              {mainCategory}
              </Container>
              <Container className={appStyles.ContentProfile}>
              {maincategoryScrshots}
              </Container>
            </>
          ) : (
            <Container className={appStyles.Content}>
            <Asset spinner />
            </Container>
          )}

      </Col>
      <Col md={4} className="d-none d-lg-block p-0 " lg={3}>
        <AllCategory setScrshots={setScrshots} setCategory={setCategory}/>
        </Col>
    </Row>
  );
}

export default CategoryPage;