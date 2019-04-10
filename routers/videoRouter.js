import express from "express";
import routes from "../routes";
import {
  videos,
  upload,
  videoDetail,
  editvideo,
  deleteVideo
} from "../controllers/videoController";

const videoRouter = express.Router();
videoRouter.get(routes.home, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editvideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
