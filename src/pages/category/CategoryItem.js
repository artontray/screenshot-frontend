import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
const CategoryItems = (props) => {
  const { category, mobile, imageSize = 55 } = props;
  const { id, description, image, title } = category;

  const currentUser = useCurrentUser();


 

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/category/${category.id}`}>
        <Avatar   src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
      <Badge variant="light" className="text-center"><span>{title}</span></Badge>
      </div>

    </div>
  );
};

export default CategoryItems;