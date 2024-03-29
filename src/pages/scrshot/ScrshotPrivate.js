import React from "react";
import styles from "../../styles/ScrshotPrivate.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import Badge from "react-bootstrap/Badge";
import stylesIcon from "../../styles/MoreDropdown.module.css";


/**
 * ScrshotPrivate  Component is displaying 
 * the information about a selected Private screenshot
 * */
const ScrshotPrivate = (props) => {

  const {
    id,
    owner,
    title,
    content,
    category_title,
    category,
    image,
    updated_at,
    setCategory,
    setScrshots,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();


  /**
 * Redirect to edition page
 * */
  const handleEdit = () => {
    history.push(`/scrshot_private/${id}/edit`);
  };



  /**
   * Delete a private screenshot
   * */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/private-scrshot/${id}/`);
      setCategory((prevScrshot) => ({
        results: [
          {
            ...prevScrshot.results[0],
            private_screenshots_count: prevScrshot.results[0].private_screenshots_count - 1,
          },
        ],
      }));
      setScrshots((prevScrshot) => ({
        ...prevScrshot,
        results: prevScrshot.results.filter((scrshotprivate) => scrshotprivate.id !== id),
      }));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Screenshot}>

      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <p className={stylesIcon.DropdownItem}><i className="fa-solid fa-lock fa-2x"></i></p>
          <Link to={`/category/${category}`}>
            <Badge variant="light"><span className={styles.Labels}>Category</span></Badge> <h1>{category_title}</h1>

          </Link>
          <div className="d-flex align-items-center">
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/scrshot_private/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>

        {title && <Card.Title className="text-center">{title} </Card.Title>}
        <hr /><span>{updated_at}</span><hr />
        {content && <Card.Text>{content}</Card.Text>}

      </Card.Body>
    </Card>
  );
};

export default ScrshotPrivate;