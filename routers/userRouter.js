import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  changePassword,
  postEditProfile
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);
//↑ routes.userDetail is function. Therfore, when this method is called, it should be excuted!!! . -> userDetail() 괄호 꼭! 명시

export default userRouter;
