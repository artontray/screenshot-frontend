import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
function CommentEditForm(props) {
  const { 
    id, 
    content, 
    setShowEditForm, 
    setComments 
} = props;

  const [formContent, setFormContent] = useState(content);
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
        setErrors(err.response?.data);
        console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1" controlId="comment">
      <Form.Label className="d-none">comment</Form.Label>
        <Form.Control
          className={`${styles.Input} ${styles.InputTextarea}`}
          as="textarea"
          name="comment"
          value={formContent}
          maxLength={2048}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>
      {errors.comment?.map((message, idx) => (
              <div key={idx} className={styles.bgwarning}>{message}</div>
            ))}
      <div className="text-right">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle}`}
          disabled={!content.trim()}
          type="submit"
        >
          Save
        </Button>



      </div>
    </Form>
  );
}

export default CommentEditForm;