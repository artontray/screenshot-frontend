import React from "react";
import styles from "../../styles/Profile.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Badge from "react-bootstrap/Badge";
const CategoryItems = (props) => {
  const { category, mobile, imageSize = 85 } = props;
  const {  image, title } = category;



 

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