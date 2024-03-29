import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Badge from "react-bootstrap/Badge";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrshotPublic from "../scrshot/ScrshotPublic";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

/**
 * ProfilePage component is displaying the profile of a selected
 * User (id in URL) with all information about this user and 
 * all published screenshot fron this user.
 */

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileScrshots, setProfileScrshots] = useState({ results: [] });
  const [ProfileInfo, setProfileInfo] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    let isMounted = true;
    const handleMount = async () => {
      try {
        if (isMounted) {
          const [{ data: pageProfile }, { data: profileScrshots }] =
            await Promise.all([
              axiosReq.get(`/profiles/${id}/`),
              axiosReq.get(`/public-scrshot/?owner__profile=${id}`),
            ]);
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: [pageProfile] },
          }));
          setProfileScrshots(profileScrshots);
          setHasLoaded(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
    return () => {
      isMounted = false;

    }
  }, [id, setProfileData, ProfileInfo]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div><span className={styles.Labels}><h3>{profile?.nb_screenshots_public}</h3></span></div>
              <div><Badge variant="light"><span className={styles.Labels}>Public</span></Badge></div>
            </Col>
            <Col xs={3} className="my-2">
              <div><span className={styles.Labels}><h3>{profile?.nb_screenshots_private}</h3></span></div>
              <div><Badge variant="light"><span className={styles.Labels}>Private</span></Badge></div>
            </Col>
            <Col xs={3} className="my-2">
              <div><span className={styles.Labels}><h3>{profile?.followers_count}</h3></span></div>
              <div><Badge variant="light"><span className={styles.Labels}>Followers</span></Badge></div>
            </Col>
            <Col xs={3} className="my-2">
              <div><span className={styles.Labels}><h3>{profile?.following_count}</h3></span></div>
              <div><Badge variant="light"><span className={styles.Labels}>Following</span></Badge></div>
            </Col>
          </Row>

        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Follow}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.UnFollow}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.description && <Col className="p-3">{profile.description}</Col>}
      </Row>
    </>
  );

  const mainprofileScrshots = (
    <>
      <hr />
      <p className="text-center">Screenshot(s) From <Badge variant="light" className="text-center"><span className={styles.Labels}>{profile?.owner}</span></Badge></p>
      <hr />
      {profileScrshots.results.length ? (
        <InfiniteScroll
          children={profileScrshots.results.map((scrshot) => (
            <ScrshotPublic key={scrshot.id} {...scrshot} setScrshots={setProfileScrshots} setProfileInfo={setProfileInfo} />
          ))}
          dataLength={profileScrshots.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileScrshots.next}
          next={() => fetchMoreData(profileScrshots, setProfileScrshots)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={
            `No results found, ${profile?.owner} hasn't publish any screenshot yet.`
          }
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />

        {hasLoaded ? (
          <>
            <Container className={appStyles.Content}>
              {mainProfile}
            </Container>
            <Container className={appStyles.ContentProfile}>
              {mainprofileScrshots}
            </Container>
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;