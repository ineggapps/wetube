import express from "express";
import routes from "../routes";

import {
  getUpload,
  postUpload,
  videoDetail,
  editvideo,
  deleteVideo,
  videos
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);
//↑ routes.videoDetail is function. Therfore, when this method is called, it should be excuted!!! . -> videoDetail() 괄호 꼭! 명시
videoRouter.get(routes.editVideo, editvideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
