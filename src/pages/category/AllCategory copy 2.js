import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const AllCategory = ({ mobile }) =>{
  const [categoryData, setCategoryData] = useState({
 
    pageCategory: { results: [] },
    popularCategory: { results: [] },
  });
  const { popularCategory } = categoryData;
  const currentUser = useCurrentUser();

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
      className={`${appStyles.Content} ${	
        mobile && "d-lg-none text-center mb-3"	
      }`}	
    >	
      {popularCategory.results.length ? (	
        <>	
          <p>Most followed profiles.</p>	
          {mobile ? (	
            <div className="d-flex justify-content-around">	
              {popularCategory.results.map((category) => (	
                <span key={category.id}>{category.title}</span>	
              ))}	
            </div>	
          ) : (	
            popularCategory.results.map((category) => (	
              <p key={category.id}>{category.title}</p>	
            ))	
          )}	
        </>	
      ) : (	
        <Asset spinner />	
      )}	
    </Container>
  );
};

export default AllCategory;