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
      console.log("This is the jwtToken for Created Products ", jwtToken);
    Products.find({ user: jwtToken._id}, function(err, result) {
      if (err) { 
          return res.status(500).send(err);
      } else {
      res.send(result);
      console.log("this is the result for products", result);
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
    Products.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        Products.find({ user: req.user._id }, function(err, result) {
          if (err) return res.status(500).send(err);
          res.send(result);
        });
      }
    });
  });

  app.get('/api/products/getProducts/:storename', function(req, res) {
    var userStore = {};
    User.findOne({ 'settings.storeName': req.params.storename}, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        var user = result;
        console.log("getProducts user is : " + user);
        userStore.storeName = user.settings.storeName;
        userStore.greeting = user.settings.greetingMessage;
        userStore.profile_products = user.instagram.profile_products;
        Products.find({ user: result._id }, function(err, result) {
          if (err) {
            return res.status(500).send(err);
          } else {
            userStore.products = result;
            res.send(userStore);
          }
        });
        }
    });
  });
};