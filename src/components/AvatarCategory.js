import React from "react";
import styles from "../styles/AvatarCategory.module.css";

const AvatarCategory = ({ src, height = "100%", text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar-category"
      />
      {text}
    </span>
  );
};

export default AvatarCategory;