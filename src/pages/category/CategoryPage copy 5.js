import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Comment from "../comments/Comment";
import Badge from "react-bootstrap/Badge";
import appStyles from "../../App.module.css";
import { useHistory } from "react-router-dom";
import styles from "../../styles/CategoryPage.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Category from "./Category";
import NoResults from "../../assets/no-results.png";
import ScrshotPrivate from "../scrshot/ScrshotPrivate";
import { axiosRes } from "../../api/axiosDefaults";
import AllCategory from "../category/AllCategory";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import {
    useCategoryData,
    useSetCategoryData,
  } from "../../contexts/CategoryDataContext";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { MoreDropdown } from "../../components/MoreDropdown";
function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState({ results: [] });
  const history = useHistory();
  const currentUser = useCurrentUser();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scrshots, setScrshots] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: category }, { data: scrshots }] = await Promise.all([
          axiosReq.get(`/category/${id}`),
          axiosReq.get(`/private-scrshot/?category=${id}`),
        ]);
        setCategory({ results: [category] });
        
        setScrshots(scrshots);
        
        console.log(category);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);
  const handleEdit = () => {
    history.push(`/`);
  };







  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/category/${id}/`);
      history.push("/ListScrshotPrivatePage");
      /*history.goBack();*/

    } catch (err) {
      console.log(err);
    }
  };



  const mainCategory = (
    <>
      
      <Row noGutters className="px-3 text-center">
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
        <Col lg={3} className=" no-gutters ml-auto">
        <div className="d-flex align-items-center">
        {currentUser && <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />}
              </div>
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

            `No results found, ${category?.title} is empty.`
        }

        />
      )}

    </>
  );




  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <AllCategory mobile  />
        
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
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <AllCategory />
      </Col>
    </Row>
  );
}

export default CategoryPage;