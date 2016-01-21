var Products = require('../app/models/products');
var User = require('../app/models/user');
var config = require('../config/database');

module.exports = function(app, saveToken) {

//   app.post('/api/products/', function(req, res) {
//     Products.find({}, function(err, result) {
//       if (err) return res.status(500).send(err);
//       res.send(result);
//     });
//   });

  app.get('/api/products/getUserCreatedProducts/', function(req, res) {
      var jwtToken = app.get('jwt');
    //   console.log("This is the jwtToken for Created Products ", jwtToken);
    Products.find({ user: jwtToken._id}, function(err, result) {
      if (err) { 
          return res.status(500).send(err);
      } else {
      res.send(result);
    //   console.log("this is the result for products", result);
      }
    });
  });

  app.post('/api/products/', function(req, res) {
    var newProducts = new Products(req.body);
    newProducts.save(function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  });

  app.delete('/api/products/:id', function(req, res) {
    var jwtToken = app.get('jwt');
    Products.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        Products.find({ user: jwtToken._id }, function(err, result) {
          if (err) {
              return res.status(500).send(err);
          } else {
          res.send(result);
          }
        });
      }
    });
  });

  app.get('/api/products/getProducts/:shopname', function(req, res) {
    var userShop = {};
    User.findOne({ 'profile.storeName': req.params.shopname}, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        var user = result;
        console.log("getProducts user is : " + user);
        userShop.storeName = user.profile.storeName;
        userShop.bio = user.profile.bio;
        userShop.locations = user.profile.locations;
        userShop.website = user.profile.website;
        userShop.twitter = user.profile.twitter;
        userShop.facebook = user.profile.facebook;
        userShop.profile_picture = user.instagram.profile_picture;
        Products.find({ user: result._id }, function(err, result) {
          if (err) {
            return res.status(500).send(err);
          } else {
            userShop.products = result;
            res.send(userShop);
          }
        });
        }
    });
  });
  
};