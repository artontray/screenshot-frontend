import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ScrshotPublicCreateForm from "./pages/scrshot/ScrshotPublicCreateForm";
import ScrshotPublicPage from "./pages/scrshot/ScrshotPublicPage";
import ListScrshotPublicPage from "./pages/scrshot/ListScrshotPublicPage";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "./contexts/CurrentUserContext";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {

  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (

        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <ListScrshotPublicPage message="No results found. Adjust the search keyword." />
                )}
              />
              <Route
                exact
                path="/ListFollowedUsersScrshot"
                render={() => (
                  <ListScrshotPublicPage
                    message="No results found. Adjust the search keyword or follow a user."
                    filter={`owner__followed__owner__profile=${profile_id}&`}
                  />
                )}
              />
              <Route
                exact
                path="/ListLikedPublicScrshot"
                render={() => (
                  <ListScrshotPublicPage
                    message="No results found. Adjust the search keyword or like a post."
                    filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                  />
                )}
              />
              <Route exact path="/" render={() => <h1>Home page dsadepuis quand ES CE QUE HRRRR</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/scrshot_public/create" render={() => <ScrshotPublicCreateForm />} />
              <Route exact path="/scrshot_public/:id" render={() => <ScrshotPublicPage />} />
              <Route render={() => <p>Put 404 error here!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;