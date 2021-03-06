var aws = require("aws-sdk");
var express = require("express");
var multer = require("multer");
var multerS3 = require("multer-s3");
const path = require("path");
var fileupload = require("express-fileupload");
aws.config.loadFromPath(path.join(__dirname, "./awsConfig.json"));
var app = express();

var s3 = new aws.S3({});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "some-bucket",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log("hello");
      cb(null, Date.now().toString());
    },
  }),
});

app.post("/upload", fileupload(), function (req, res) {
  console.log(req.files);
  res.send("Successfully uploaded " + req.files.length + " files!");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
