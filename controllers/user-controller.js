const User = require("../models/Users");
const bcrypt = require("bcrypt");

var signup = function (req, res, next) {
  User.find({ username: req.body.username }, (err, users) => {
    if (err) {
      res.status(404).json({
        message: err,
      });
    } else {
      if (users.length < 1) {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
          });
          user
            .save()
            .then((result) => {
              res.status(200).json({
                message: "user has been sotred successfully ...",
              });
            })
            .catch((err) => {
              res.status(404).json({
                message: err.message,
              });
            });
        });
      } else {
        res.status(404).json({
          message: "User is already found",
        });
      }
    }
  });
};

var signin = function (req, res, next) {
  User.find({ username: req.body.username }, (err, users) => {
    if (err) {
      res.status(404).json({ message: err });
    } else {
      if (users.length == 1) {
        bcrypt.compare(
          req.body.password,
          users[0].password,
          (err, userIsFound) => {
            if (userIsFound) {
              res
                .status(200)
                .json({ message: users[0] });
            } else {
              res.status(404).json({ message: "Password is wrong" });
            }
          }
        );
      } else {
        res.status(404).json({ message: "User is not found" });
      }
    }
  });
};

var updateUser = function (req, res, next) {
  var id = req.params.id;
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      User.findById(id)
        .then((user) => {
          if (user) {
            User.findOne({ username: req.body.username })
              .then((userIsFound) => {
                if (userIsFound) {
                  res.status(404).json({ message: "User is already token" });
                } else {
                  var updatedUser ={
                    username: req.body.username,
                    password: hashedPassword,
                  };
                  updatedUser
                    .updateOne(id, { $set: updatedUser })
                    .then((result) => {
                      res.status(204).json({
                        message:
                          "User with id : " +
                          id +
                          " has been updated successfully...",
                      });
                    })
                    .catch((err) => {
                      res.status(404).json({ message: err });
                    });
                }
              })
              .catch((err) => {
                res.status(404).json({ message: err });
              });
          } else {
            res.status(404).json({ message: "User is not defined" });
          }
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

var deleteUser=function(req,res,next){
  var id=req.params.id;
  User.deleteOne({_id:id})
  .then(result=>{
    if(result)
    {
      if(result.deletedCount==0)
      {
        res.status(404).json({message:'User with id '+id+' is not found'})
      }
      else
      {
        res.status(202).json({message:'User has been deleted successfully...'})
      }
    }
  })
  .catch(err=>{
    res.status(404).json({message:err})
  })
}


module.exports = {
  signup: signup,
  signin: signin,
  updateUser: updateUser,
  deleteUser:deleteUser,
};
