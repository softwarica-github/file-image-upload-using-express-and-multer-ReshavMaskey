var express = require("express");
// instace of app
var app = express();
var multer = require("multer");
var path = require("path");
var bodyparser = require("body-parser");

app.set("views", __dirname + "/view");
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({ extended: true })); //multipart data for image video giving true
app.use(bodyparser.json());
///setting of resources file
app.use(express.static(path.join(__dirname, "res")));

app.get("/main", function(req, res) {
  res.render("index");
});

var imgUpload = multer.diskStorage({
  destination: function(req, file, des) {
    console.log("Img upload multer");
    des(null, "res/uploads");
  },
  filename: function(req, file, des) {
    des(null, "image" + req.file);
  }
});
var upload = multer({
  storage: imgUpload
});
app.post("/upload", upload.single("upload"), function(req, res, next) {
  console.log(req.body);
  console.log(req.body.upload.filename + " file added");
});
// app.post("/upload", function(req, res) {
//   res.render("index");
//   // res.json({
//   //   name: req.body.name,
//   //   email: req.body.email,
//   //   address: req.body.address,
//   //   feedback: req.body.feedback,
//   //   file: req.body.uploadedFile
//   // });
// });
app.listen(process.env.PORT);
