import express from "express";
import routes from "../routes";
import {
  upload,
  videoDetail,
  editvideo,
  deleteVideo,
  videos
} from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editvideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
