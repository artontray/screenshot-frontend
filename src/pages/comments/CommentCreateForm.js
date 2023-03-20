import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
function CommentCreateForm(props) {
  const { 
    public_screenshot, 
    setScrshot, 
    setComments
} = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        public_screenshot,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setScrshot((prevScrshot) => ({
        results: [
          {
            ...prevScrshot.results[0],
            comments_count: prevScrshot.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>

          <Form.Control
            className={`${styles.Input} ${styles.InputTextarea}`}
            placeholder="write a comment..."
            as="textarea"
            value={content}
            maxLength={2048}
            onChange={handleChange}
            rows={3}
          />
        </InputGroup>
      </Form.Group>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.PurpleStyle} d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        Publish
      </Button>
    </Form>
  );
}

export default CommentCreateForm;