import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom";
import { SeeAllDropdown } from "../../components/MoreDropdown";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import stylesIcon from "../../styles/MoreDropdown.module.css";
import Badge from "react-bootstrap/Badge";
import {  useParams } from "react-router-dom";
const AllCategory = ({ mobile }) => {

  const [categoryData, setCategoryData] = useState({

    pageCategory: { results: [] },
    popularCategory: { results: [] },
  });
  const { popularCategory } = categoryData;
  const [category, setCategory] = useState({ results: [] });
  const [scrshots, setScrshots] = useState({ results: [] });
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
  }, [currentUser]);

  return (
    <Container
      className={`${appStyles.Content} ${mobile && "d-lg-none text-center mb-3"
        }`}
    >
      {popularCategory.results.length ? (
        <>




          <Media className="align-items-center justify-content-between">
<p>Dashboard</p>
            


              {
                <SeeAllDropdown
                handleSeeAllCategory={handleSeeAllCategory}
                  handleSeeLastPrivateScrshot={handleSeeLastPrivateScrshot}
                  SearchCategory={SearchCategory}
                />
              }
           
          </Media>






          {mobile ? (
            popularCategory.results.slice(0, 5).map((category, i) => (
              
                <Link key={category.id} className="align-self-center" to={`/category/${category.id}`}>{'  '}
                  
                  <Badge   variant="light" className="text-center"><span >{category.title.toString().slice(0, 15)} ({category.private_screenshots_count})  </span></Badge>{'  '}
                </Link>
                
              
            ))
          ) : (





            popularCategory.results.map((category) => (




              
              
                  
                    
              <Media key={category.id} className="align-items-center justify-content-between">
          <Link to={`/category/${category.id}`}>
            <Avatar   src={category.image} height={45} />
            
            <Badge variant="light" className="text-center"><span>{category.title.toString().slice(0, 15)}</span></Badge>
          </Link>
          <div className={stylesIcon.DropdownItem}>
          <h3>{category.private_screenshots_count}
          <i className="fa-solid fa-camera fa-1x"></i></h3>
            
          </div>
        </Media>
                    
                 
                  
                 
             







           





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