/** @format */

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("mp3");

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /mp3/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: MP3 Files Only!");
  }
}

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Home route
app.get("/", (req, res) => res.send("Sound Upload"));

// Upload route
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file == undefined) {
        res.send("Error: No File Selected!");
      } else {
        res.send(
          `File Uploaded! <a href="/uploads/${req.file.filename}">View File</a>`
        );
      }
    }
  });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
