// import { videos } from "../db";
import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

import { pathToFileURL } from "url";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// https://regex101.com → Using regular expression
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  console.log(title, description, path);
  // To Do: Upload and save video
  // To Do: get new video id.
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  console.log(newVideo);
  //res.render("upload", { pageTitle: "Upload" });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  console.log(req.params);
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); // populate of property can be used only "Object" type.
    // console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove(id);
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(routes.home);
  }
};

// API Controller

//Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
    res.status(200);
    res.send(JSON.stringify(newComment));
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

//DELETE comment
export const postRemoveComment = async (req, res) => {
  const {
    params: { id, commentId },
    user
  } = req;
  try {
    const video = await Video.findById(id).populate("comments");
    const comment = await Comment.findById(commentId);
    console.log(comment, "*****", comment.creator, user.id);
    if (String(comment.creator) !== user.id) {
      throw "Comment can be deleted only writer!";
      return;
    }
    await video.comments.pull(commentId);
    video.save();
    await Comment.findByIdAndDelete(commentId);
    res.status(200);
    res.send("done!");
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(
      JSON.stringify({
        error
      })
    );
  } finally {
    res.end();
  }
};
