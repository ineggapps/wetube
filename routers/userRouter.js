import express from "express";
import routes from "../routes";
import { userDetail, editProfile, changePassword } from "../controllers/userController";
const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);
//↑ routes.userDetail is function. Therfore, when this method is called, it should be excuted!!! . -> userDetail() 괄호 꼭! 명시

export default userRouter;
