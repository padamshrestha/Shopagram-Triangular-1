var User = require('../app/models/user');
var config = require('../config/database');

module.exports = function(app, saveToken) {

  app.put('/api/profile', function(req, res) {
    var jwtToken = app.get('jwt');
    console.log("this is the token", jwtToken);
    console.log("this is the body", req.body);
    User.findByIdAndUpdate(jwtToken._id, {profile: req.body}, {new: true}, function(err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  });
};