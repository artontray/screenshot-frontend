import React from "react";
import styles from "../../styles/ScrshotPublic.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import Alert from 'react-bootstrap/Alert'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { render } from "@testing-library/react";
import AlertMessage from "../../styles/AlertMessage.module.css";




const ScrshotPublic = (props) => {

  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    scrshotPage,
    setScrshots,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const history = useHistory();

  const handleEdit = () => {
    history.push(`/ScrshotPublic/${id}/edit`);
  };









  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/public-scrshot/${id}/`);

      history.push("/");

    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      /* "public_screenshot" is the name of screenshot instance provided by back-end (check serializers.py from Likes)*/
      const { data } = await axiosRes.post("/likes/", { public_screenshot: id });
      setScrshots((prevScrshot) => ({
        ...prevScrshot,
        results: prevScrshot.results.map((public_screenshot) => {
          return public_screenshot.id === id
            ? { ...public_screenshot, likes_count: public_screenshot.likes_count + 1, like_id: data.id }
            : public_screenshot;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setScrshots((prevScrshot) => ({
        ...prevScrshot,
        results: prevScrshot.results.map((scrshot) => {
          return scrshot.id === id
            ? { ...scrshot, likes_count: scrshot.likes_count - 1, like_id: null }
            : scrshot;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };


  return (


    <Card className={styles.Screenshot}>
      
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && scrshotPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/scrshot_public/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.ScreenshotBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/public-scrshot/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ScrshotPublic;