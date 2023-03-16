import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Comment from "../comments/Comment";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import ScrshotPublic from "./ScrshotPublic"
import InfiniteScroll from "react-infinite-scroll-component";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
function ScrshotPublicPage() {
  const { id } = useParams();
  const [scrshot, setScrshot] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: scrshot }, { data: comments }] = await Promise.all([
          axiosReq.get(`/public-scrshot/${id}`),
          axiosReq.get(`/comments/?public_screenshot=${id}`),
        ]);
        setScrshot({ results: [scrshot] });
        setComments(comments);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>

        
        <ScrshotPublic {...scrshot.results[0]} setScrshots={setScrshot} scrshotPage />
        <Container className={appStyles.ContentComment}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              public_screenshot={id}
              setScrshot={setScrshot}
              setComments={setComments}
              />
              ) : comments.results.length ? (
                "Comments"
              ) : null}
              {comments.results.length ? (
                <InfiniteScroll
                  children={comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setScrshot={setScrshot}
                      setComments={setComments}
                    />
                  ))}
                  dataLength={comments.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!comments.next}
                  next={() => fetchMoreData(comments, setComments)}
                />
              ) : currentUser ? (
                
                <div className={appStyles.MessagesInfo}>No comments yet, be the first to comment!</div>
              ) : (
                <span>No comments... yet</span>
              )}
            </Container>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
        </Col>
    </Row>
  );
}

export default ScrshotPublicPage;