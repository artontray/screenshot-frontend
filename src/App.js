import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import ScrshotPublicCreateForm from "./pages/scrshot/ScrshotPublicCreateForm";
import ScrshotPrivateCreateForm from "./pages/scrshot/ScrshotPrivateCreateForm";
import CategoryCreateForm from "./pages/category/CategoryCreateForm";
import ScrshotPublicPage from "./pages/scrshot/ScrshotPublicPage";
import ListScrshotPublicPage from "./pages/scrshot/ListScrshotPublicPage";
import ListScrshotPrivatePage from "./pages/scrshot/ListScrshotPrivatePage";

import ScrshotPrivateEditForm from "./pages/scrshot/ScrshotPrivateEditForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ScrshotPublicEditForm from "./pages/scrshot/ScrshotPublicEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";

import SelectNewWhat from "./pages/selections/SelectNewWhat";
import DisplayPrivateScrtshot from "./pages/scrshot/DisplayPrivateScrtshot";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import ListAllCategoryPage from "./pages/category/ListAllCategoryPage";
import CategoryPage from "./pages/category/CategoryPage";

import CategoryEditForm from "./pages/category/CategoryEditForm";
import HomePage from "./pages/home/HomePage";

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
                message="No results found. Adjust the search keyword or follow more ScreenShooters"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/ListLikedPublicScrshot"
            render={() => (
              <ListScrshotPublicPage
                message="No results found. Adjust the search keyword or like more ScreenShots"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/home" render={() => <HomePage />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/scrshot_public/create" render={() => <ScrshotPublicCreateForm />} />
          <Route exact path="/scrshot_public/:id" render={() => <ScrshotPublicPage />} />
          <Route exact path="/scrshot_public/:id/edit" render={() => <ScrshotPublicEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />

          <Route exact path="/scrshot_private/:id/edit" render={() => <ScrshotPrivateEditForm />} />
          <Route exact path="/category/create" render={() => <CategoryCreateForm />} />
          <Route exact path="/ListScrshotPrivatePage" render={() => <ListScrshotPrivatePage message="No results found. Adjust the search keyword!"/>} />
          <Route exact path="/scrshot_private/create" render={() => <ScrshotPrivateCreateForm />} />
          <Route exact path="/SelectNewWhat" render={() => <SelectNewWhat />} />
          <Route exact path="/ListAllCategoryPage" render={() => <ListAllCategoryPage />} />
          <Route exact path="/category/:id" render={() => <CategoryPage />} />
          <Route exact path="/scrshot_private/:id" render={() => <DisplayPrivateScrtshot />} />
          <Route exact path="/category/:id/edit" render={() => <CategoryEditForm />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />

          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
      
    </div>
  );
}

export default App;