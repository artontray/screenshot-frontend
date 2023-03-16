import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import styles from "../../styles/CategoryPage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Badge from "react-bootstrap/Badge";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import AllCategory from "../category/AllCategory";
import {
  useCategoryData,
  useSetCategoryData,
} from "../../contexts/CategoryDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrshotPrivate from "../scrshot/ScrshotPrivate";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { CategoryEditDropdown } from "../../components/MoreDropdown";

function CategoryPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [categoryScrshots, setScrshots] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setCategoryData, handleFollow, handleUnfollow } = useSetCategoryData();
  const { pageCategory } = useCategoryData();
  const history = useHistory();
  const [category] = pageCategory.results;
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageCategory }, { data: categoryScrshots }] =
          await Promise.all([
            axiosReq.get(`/category/${id}/`),
            axiosReq.get(`/private-scrshot/?category=${id}`),
          ]);
        setCategoryData((prevState) => ({
          ...prevState,
          pageCategory: { results: [pageCategory] },
        }));
        setScrshots(categoryScrshots);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setCategoryData]);

  const mainCategory = (
    <>
      {currentUser && <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.CategoryImage}
            roundedCircle
            src={category?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{category?.title}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
            <i class="fa-solid fa-camera fa-3x"></i>
          <h1>{category?.private_screenshots_count} </h1>
            </Col>
            
          </Row>

        </Col>

        {category?.description && <Col className="p-3">{category.description}</Col>}
      </Row>
    </>
  );

  const maincategoryScrshots = (
    <>
      <hr />
      <p className="text-center">Screenshot(s) From <Badge variant="light" className="text-center"><span className={styles.Labels}>{category?.title}</span></Badge></p>
      <hr />
      {categoryScrshots.results.length ? (
        <InfiniteScroll
          children={categoryScrshots.results.map((scrshot) => (
            <ScrshotPrivate key={scrshot.id} {...scrshot} setScrshots={setScrshots} />
          ))}
          dataLength={categoryScrshots.results.length}
          loader={<Asset spinner />}
          hasMore={!!categoryScrshots.next}
          next={() => fetchMoreData(categoryScrshots, setScrshots)}
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
      <AllCategory mobile />
        
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