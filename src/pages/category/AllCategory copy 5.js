import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom";
import { SeeAllCategoryDropdown } from "../../components/MoreDropdown";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
const AllCategory = ({ mobile }) => {
  const [categoryData, setCategoryData] = useState({

    pageCategory: { results: [] },
    popularCategory: { results: [] },
  });
  const { popularCategory } = categoryData;
  const currentUser = useCurrentUser();
  const history = useHistory();
  const handleSeeAll = () => {
    history.push(`/ListAllCategoryPage`);
  };
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          `/category/`
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
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"
        }`}
    >
      {popularCategory.results.length ? (
        <>




          <Media className="align-items-center justify-content-between">
            <p>Favorites Categories: </p>
            <p className="d-flex align-items-center">


              {
                <SeeAllCategoryDropdown
                  handleSeeAll={handleSeeAll}
                />
              }
            </p>
          </Media>






          {mobile ? (
            popularCategory.results.slice(0, 5).map((category) => (
              <>
                <Link className="align-self-center" to={`/category/${category.id}`}>
                  <Avatar src={category.image} height="55" />
                </Link>
              </>
            ))
          ) : (




            <div className="align-self-center">
              {popularCategory.results.map((category) => (




                <>
                  <div key={category.id}>
                    <Link className="align-self-left" to={`/category/${category.id}`}>
                      <Avatar src={category.image} height="55" />
                      
                    </Link>
                    </div>
                    <div>
                    <Link className="align-self-center" to={`/category/${category.id}`}>
                      
                    <h6>{category.title.toString().slice(0,15)}</h6>
                    </Link>
                    </div>

         
            
                  
                	<div className={`text-right ${!mobile && "ml-auto"}`}>
                    <i class="fa-solid fa-camera fa-3x"></i>
                  </div>
              
              </>





          ))}
        </div>
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