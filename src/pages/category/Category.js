import React from "react";
import styles from "../../styles/ScrshotPublic.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import AvatarCategory from "../../components/AvatarCategory";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import Badge from "react-bootstrap/Badge";
import StylesAvatar from "../../styles/AvatarCategory.module.css";



const Category = (props) => {

  const {
    id,
    owner,
    title,
    description,
    image,
    created_at,
    updated_at,
    private_screenshots_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  var ShortTitle
  if (title.length > 21){
    ShortTitle = title.toString().replace(/^(.{20}[^\s]*).*/, "$1") + "...";
  }else{
    ShortTitle = title.toString();
  }
    

  const history = useHistory();

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
          <i class="fa-solid fa-camera fa-3x"></i>
          <h1>{private_screenshots_count} </h1>
          <h4>{ShortTitle}</h4>
            
          </Link>
          <div className="d-flex align-items-center">
            
  
            {is_owner   && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>


    </Card>
  );
};

export default Category;