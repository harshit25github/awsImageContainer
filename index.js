const express = require("express");
const port = 3000;
const app = express();
const s3 = require("./awsFileUpload");
const { v4 } = require("uuid");
// const path = require("path");
// app.use(bodyParser.json());
// const s3 = require("./awsFileUpload");
// const upload = multer({
//   storage: multers3({
//     s3,
//     acl: "public-read",
//     bucket: "elixirwithgo",
//     key: (req, file, cb) => {
//       console.log(file);
//       cb(null, "hello.jpg");
//     },
//   }),
// });

function myCustomUploadMiddleware(req, res, next) {
  var data = new Buffer("");
  req.on("data", function (chunk) {
    data = Buffer.concat([data, chunk]);
  });
  req.on("end", function () {
    req.rawBody = data;
    next();
  });
}

app.post("/upload", myCustomUploadMiddleware, (req, res) => {
  s3.upload(
    {
      ACL: "public-read",
      Bucket: "cdsfdvfad3",
      Body: req.rawBody,
      ContentType: req.headers["content-type"],
      Key: `${v4()}.${req.headers["content-type"].split("/")[1]}`,
    },
    (err, done) => {
      if (err) return res.status(500).send();
      res.json({ imageLink: done.Location });
    }
  );
});

app.listen(port, () => {
  console.log(`app is ${port}`);
});
