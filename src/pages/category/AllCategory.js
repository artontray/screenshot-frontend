import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/CategoryPage.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom";
import { SeeAllDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Media } from "react-bootstrap";
import {  useParams } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
const AllCategory = ({ mobile }) => {

  const [categoryData, setCategoryData] = useState({

    pageCategory: { results: [] },
    popularCategory: { results: [] },
  });
  const { popularCategory } = categoryData;
  const currentUser = useCurrentUser();
  const history = useHistory();
  const handleSeeAllCategory = () => {
    history.push(`/ListAllCategoryPage`);
  };

  const handleSeeLastPrivateScrshot = () => {
    history.push(`/ListScrshotPrivatePage`);
  };

  const SearchCategory = () => {
    history.push(`/ListAllCategoryPage`);
  };
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/category/?ordering=-private_screenshots_count&`
        );

        setCategoryData((prevState) => ({
          ...prevState,
          popularCategory: data,
        }));

      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser, id]);

  return (
    <Container
      className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"
        }`}
    >
      {popularCategory.results.length ? (
        <>




          <Media className="align-items-center justify-content-between">

            
<p><NavLink className={styles.NavLink} to={`/category/create`} >

<i className="fa-solid fa-circle-plus fa-2x"></i>

</NavLink></p>


              {
                
                <SeeAllDropdown
                handleSeeAllCategory={handleSeeAllCategory}
                  handleSeeLastPrivateScrshot={handleSeeLastPrivateScrshot}
                  SearchCategory={SearchCategory}
                  DeleteCategory={SearchCategory}
                />
              }
           
          </Media>






          {mobile ? (
            <div className="d-flex justify-content-around">
            {popularCategory.results.slice(0, 3).map((category) => (
              
              <CategoryItem key={category.id} category={category} mobile />
                
              
              ))}
             </div>
          ) : (




<Col md={4} className="d-none d-lg-block p-0 " lg={2}>
            {popularCategory.results.map((category) => (




              
              
                  
                 
              
              <CategoryItem key={category.id} category={category} />
            
             
                 
             

           





            ))}  </Col>

          )}
        </>
      ) : (
        <Asset spinner />
      )
      }
    </Container >
  );
};

export default AllCategory;