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
import stylesIcon from "../../styles/MoreDropdown.module.css";
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
          `/category/?owner=${currentUser?.pk}&ordering_fields=-private_screenshots_count&`
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





            popularCategory.results.map((category) => (




              <>
              
                  
                    
          <Media className="align-items-center justify-content-between">
          <Link to={`/category/${category.id}`}>
            <Avatar src={category.image} height={55} />
            {category.title.toString().slice(0, 15)}
          </Link>
          <div className={stylesIcon.DropdownItem}>
          {category.private_screenshots_count}
          <i class="fa-solid fa-camera fa-2x"></i>
            
          </div>
        </Media>
                    
                 
                  
                 
             







              </>





            ))

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