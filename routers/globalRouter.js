import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  logout,
  postLogin,
  githubLogin,
  postGithubLogIn,
  getMe,
  facebookLogin,
  postFacebookLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

//GUIDANCE: GITHUB LOGIN PROCEDURE
/*
  STEP1: Try to login by github account. 
  This router redirect to github login page!*/
globalRouter.get(routes.gitHub, githubLogin);
/* DO NOT CONFUSED!
  STEP2: Try to authenticate using github account logined.
  ① When user completed login, github redirects callback page!
  ② And then passport try to authenticate using github account info logined.
      If user failed to login such as missing email address or password,
      passport will redirect to login page. At that time, We can redirect page with error message. 
  ③ If user succeed to login, passport will forward User account get by github to postGithubLogin method. 
      postGithubLogin contains that redirecting the routes.home(/) page.
*/
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogIn
);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  postFacebookLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
