import React from "react";
import styles from "../../styles/ScrshotPublic.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import AvatarCategory from "../../components/AvatarCategory";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { MoreDropdownCategory } from "../../components/MoreDropdown";
import Badge from "react-bootstrap/Badge";
import StylesAvatar from "../../styles/AvatarCategory.module.css";
import { NavLink } from "react-router-dom";



const Category = (props) => {

  const {
    id,
    owner,
    title,
    description,
    image,
    created_at,
    updated_at,
    scrshotPage,
    private_screenshots_count,
    setCategory,
    category,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
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
          <Link to={`/category/${id}`}>
            <i className="fa-solid fa-camera fa-3x"></i>
            <h1>{private_screenshots_count} </h1>
            <h4>{ShortTitle}</h4>

          </Link>
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


    </Card>
  );
};

export default Category;