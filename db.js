import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB");
const handleError = error => console.log(`Error on DB Connection:${error}`);
db.once("open", handleOpen);
db.on("error", handleError);

/* export const videos = [
  {
    id: 324393,
    title: "Video awesome",
    description: "This is something I love",
    views: 240000,
    videoFile:
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    creator: {
      id: 121212,
      name: "Inegg",
      email: "inegg.apps@gmail.com"
    }
  },
  {
    id: 2342342345,
    title: "Video nice",
    description: "This is something I love",
    views: 240000,
    videoFile:
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    creator: {
      id: 121212,
      name: "Inegg",
      email: "inegg.apps@gmail.com"
    }
  },
  {
    id: 324395,
    title: "Video perfect",
    description: "This is something I love",
    views: 240000,
    videoFile:
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    creator: {
      id: 121212,
      name: "Inegg",
      email: "inegg.apps@gmail.com"
    }
  },

  {
    id: 234234,
    title: "Video melong",
    description: "This is something I love",
    views: 240000,
    videoFile:
      "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    creator: {
      id: 121212,
      name: "Inegg",
      email: "inegg.apps@gmail.com"
    }
  }
];
 */
