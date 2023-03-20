import React from "react";
import styles from "../../styles/ScrshotPublic.module.css";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import AvatarCategory from "../../components/AvatarCategory";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";


import StylesAvatar from "../../styles/AvatarCategory.module.css";
import { NavLink } from "react-router-dom";
import appStyles from "../../App.module.css";
import  { useState } from "react";
import Alert from 'react-bootstrap/Alert'

const Category = (props) => {


  const {
    id,
    title,
    image,
    private_screenshots_count,
    setCategory,
 
  } = props;
  const [errors, setErrors] = useState({});
  var ShortTitle
  if (title.length > 21) {
    ShortTitle = title.toString().replace(/^(.{20}[^\s]*).*/, "$1") + "...";
  } else {
    ShortTitle = title.toString();
  }


  const history = useHistory();

  const handleEdit = () => {
    history.push(`/`);
  };








  const handleDeleteCategory = async () => {
    try {
      await axiosRes.delete(`/category/${id}/`);

      setCategory((prevScrshot) => ({
        ...prevScrshot,
        results: prevScrshot.results.filter((category) => category.id !== id),
      }));
      /*history.push("/");*/
      /*history.goBack();*/
      
    } catch (err) {
      console.log(err);
      if (err.response?.status === 403) {
        //alert('Keep at least one category, deleted aborted');
        setErrors(err.response?.data);

      }
      
    }
  };



  return (


    <Card className={styles.Screenshot}>

      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <div className={StylesAvatar.CategoryPhotoDesign}>
            <Link to={`/category/${id}`}>
              <AvatarCategory src={image} />

            </Link>
          </div>
          <span className="align-items-center justify-content-between">
          <i className="fa-solid fa-camera fa-2x"></i>
            <h1>{private_screenshots_count} </h1>
          
          
          <Link to={`/category/${id}`}>
            
            <h4>{ShortTitle}</h4>

          </Link>
          </span>
          <div className="d-flex ">


            <NavLink className={styles.NavLink} to={`/category/${id}`} >

              <i className="fa-regular fa-folder-open fa-2x"></i>
          
            </NavLink>

            <NavLink className={styles.NavLink} to="/ListAllCategoryPage" onClick={handleDeleteCategory}>

              <i className="fa-solid fa-trash fa-2x"></i>

            </NavLink>
            <NavLink className={styles.NavLink} to={`/category/${id}/edit`} onClick={handleEdit}>

              <i className="fa-solid fa-pen-to-square fa-2x"></i>

            </NavLink>
            

          </div>
        </Media>
      </Card.Body>
      
      {!errors && <Alert className={appStyles.AbortedAlert} severity="error">Keep at least one Category, delete aborted!</Alert>}

    </Card>
  );
};

export default Category;