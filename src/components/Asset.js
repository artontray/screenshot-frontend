import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "../styles/Asset.module.css";


/**
 * 
 * Asset component is used to display an image and a Text according the situation
 * if Spinner, it will show up a loading icon
 */
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} height="193px" width="193px"/>}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;