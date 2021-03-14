const Aws = require("aws-sdk");
const path = require("path");
Aws.config.loadFromPath(path.join(__dirname, "./awsConfig.json"));
const s3 = new Aws.S3();

// s3.deleteBucket({ Bucket: "baalti" }, (err, data) => {
//   console.log(data);
// });
s3.createBucket({ Bucket: "cdsfdvfad3", GrantRead: "" }, (err, data) => {
  if (err) console.log(err.message);
  s3.listBuckets((err, buc) => {
    console.log(buc);
  });
});

// const fs = require("fs");
// const readStream = fs.createReadStream("./hello.json");
// const { v4 } = require("uuid");
// s3.upload(
//   {
// ACL: "public-read",
// Bucket: "elixirwithgo",
// Body: readStream,
// ContentType: "application/json",
// Key: "hello.json",
//   },
//   (err, data) => {
//     if (err) return console.log(err);
//     console.log(data);
//   }
// );
module.exports = s3;
