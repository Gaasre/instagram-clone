import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // check folders
    const dir = __basedir + "/uploads/";
    let current_folder = `${dir}${process.env.CURRENT_FOLDER}/`;
    fs.readdir(current_folder, (err, files) => {
      if (!err) {
        // check folder limit
        if (files.length < process.env.FOLDER_LIMIT) {
          // save the file in current folder
          cb(null, current_folder);
        } else {
          // increment the current_folder
          process.env.CURRENT_FOLDER += 1;
          // save the file in the new folder
          let current_folder = `${dir}${process.env.CURRENT_FOLDER}/`;
          fs.mkdir(current_folder, (err) => {
            if (err) {
                cb(err, null);
            } else {
                cb(null, current_folder);
            }
          })
        }
      } else {
        cb(err, null);
      }
    });
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split(".")[1];
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter }).array(
  "files",
  5
);

export default uploadFile;
