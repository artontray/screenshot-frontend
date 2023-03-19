import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { 
    public_screenshot, 
    setScrshot, 
    setComments, 
    profileImage, 
    profile_id 
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
            placeholder="my comment..."
            as="textarea"
            value={content}
            maxLength={2048}
            onChange={handleChange}
            rows={3}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        PUBLISH
      </button>
    </Form>
  );
}

export default CommentCreateForm;