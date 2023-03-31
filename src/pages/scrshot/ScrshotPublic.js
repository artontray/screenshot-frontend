import React from "react";
import styles from "../../styles/ScrshotPublic.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";


/**
 * ScrshotPublic  Component is displaying 
 * the information about a selected Public screenshot
 * */

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
    setScrshots,
    setProfileInfo,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const history = useHistory();

  const handleEdit = () => {
    history.push(`/scrshot_public/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/public-scrshot/${id}/`);

      if (!setProfileInfo) {
        /* delete a screenshot from a page like this scrshot_public/215 so goBack() is called*/
        history.goBack();
      } else if (setProfileInfo === "0") {
        /* delete a screenshot from the page ListScrshotPublicPage so we undisplay the deleted screenshot only*/
        setScrshots((prevScrshot) => ({
          ...prevScrshot,
          results: prevScrshot.results.filter((scrshotpublic) => scrshotpublic.id !== id),
        }));
      } else {
        /* delete a screenshot from a page like this category/149 so category number of screenshot minus 1 and we undisplay the deleted screenshot*/
        setProfileInfo((prevCat) => ({

          ...prevCat,
          nb_screenshots_public: prevCat.nb_screenshots_public - 1,
        }));
        setScrshots((prevScrshot) => ({
          ...prevScrshot,
          results: prevScrshot.results.filter((scrshotpublic) => scrshotpublic.id !== id),
        }));
      }

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

            {/*if  take out && scrshotPage , we display the icon dropdown to listing also */}
            {is_owner && (
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
        <hr /><span>{updated_at}</span><hr />
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.ScreenshotBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own screenshot!</Tooltip>}
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
              overlay={<Tooltip>Log in to like this screenshot!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          <span className={styles.LikeResult}>{likes_count}</span>
          <Link to={`/scrshot_public/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ScrshotPublic;