const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const url = "mongodb://localhost/visible";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/user/login", (req, res) => {
  mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err) {
      if (err) throw err;
      User.find(
        {
          username: req.body.username,
          password: req.body.password
        },
        function(err, user) {
          if (err) throw err;
          if (user.length === 1) {
            return res.status(200).json({
              status: "success",
              data: user
            });
          } else {
            return res.status(200).json({
              status: "fail",
              message: "Login Failed"
            });
          }
        }
      );
    }
  );
});

app.post("/api/user/create", (req, res) => {
  mongoose.connect(url, { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    });
    user.save((err, res) => {
      if (err) throw err;
      return res.status(200).json({
        status: "success",
        data: res
      });
    });
  });
});

app.listen(3000, () => console.log("blog server running on port 3000!"));
