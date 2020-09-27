import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import LoginPage from "./containers/auth/loginPage";
import SignUpPage from "./containers/auth/signupPage";

import ProgressBar from "./containers/layout/progressbar";
import Navbar from "./containers/layout/navbar";
import Landing from "./components/layout/landing";
import HomePage from "./containers/homePage";
import BlogPage from "./containers/blogPage";
import PrivateRoute from "./utils/privateRoute";

import ViewPostPage from "./containers/post/viewPostPage";
import CreatePostPage from "./containers/post/createPostPage";
import UpdatePostPage from "./containers/post/updatePostPage";

import SongPlayer from "./music-player/song-player";

import UploadPage from "./containers/music/UploadPage";

if (localStorage.jwtToken) {
   const token = localStorage.jwtToken;
   setAuthToken(token);
   const decoded = jwt_decode(token);
   store.dispatch(setCurrentUser(decoded));
   const currentTime = Date.now() / 1000;
   if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "./loginPage";
   }
}

const App = () => {
   return (
      <Provider store={store}>
         <BrowserRouter>
            <ProgressBar />
            <Navbar />
            <Switch>
               <Route path="/" exact component={HomePage} />
               <Route path="/login" component={LoginPage} />
               <Route path="/signup" component={SignUpPage} />
               <PrivateRoute exact path="/blog" component={BlogPage} />
               <PrivateRoute
                  exact
                  path="/blog/post/create"
                  component={CreatePostPage}
               />
               <PrivateRoute
                  exact
                  path="/blog/post/update/:id"
                  component={UpdatePostPage}
               />
               <PrivateRoute
                  exact
                  path="/blog/music/upload"
                  component={UploadPage}
               />
               <Route exact path="/blog/post/:id" component={ViewPostPage} />
               <Route path="/blog/:author" component={BlogPage} />
               <Redirect from="*" to="/" />
            </Switch>
            <SongPlayer/>
         </BrowserRouter>
      </Provider>
   );
};

export default App;