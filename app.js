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

///////////////////////////////////////////////

//Define where project photos will be stored
var storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, "res/uploads");
  },
  filename: function(request, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  }
});

// Function to upload project images
var upload = multer({ storage: storage });

// add new photos to the DB
// app.post("/projects", function(req, res) {
//   upload(req, res, function(err) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(req.files);
//     res.end("Your files uploaded.");
//     console.log("Yep yep!");
//   });
// });
//////////////////////////////////////

// var imgUpload = multer.diskStorage({
//   destination: function(req, file, des) {
//     console.log("Img upload multer");
//     des(null, "res/uploads");
//   },
//   filename: function(req, file, des) {
//     des(null, "image.jpg");
//   }
// });
// var upload = multer({
//   storage: imgUpload
// });
// app.post("/upload", upload.single("upload"), function(req, res, next) {
//   console.log(req.body);
// });
app.post("/upload", upload.array("upload"), function(req, res, next) {
  var file = req.files;
  console.log(file);

  res.end();
});
// app.post("/upload", function(req, res) {
//   res.json({
//     name: req.body.name,
//     email: req.body.email,
//     address: req.body.address,
//     feedback: req.body.feedback,
//     file: req.body.upload
//   });
// });
app.listen(process.env.PORT);
