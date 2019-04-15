import express from "express";
import routes from "../routes";
import { userDetail, editProfile, changePassword } from "../controllers/userController";
import { onlyPrivate } from "../middlewares";
const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);
//↑ routes.userDetail is function. Therfore, when this method is called, it should be excuted!!! . -> userDetail() 괄호 꼭! 명시

export default userRouter;
