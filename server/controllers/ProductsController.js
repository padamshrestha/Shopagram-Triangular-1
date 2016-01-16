var Products = require('../app/models/products');
var User = require('../app/models/user');

module.exports = {

  read: function(req, res) {
    Products.find({}, function(err, result) {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  },

  getAuthedUsersProducts: function(req, res) {
    Products.find({ user: req.user._id}, function(err, result) {
      if (err) return res.status(500).send(err);
      res.send(result);
    });
  },

  create: function(req, res) {
    var newProducts = new Products(req.body);
    newProducts.save(function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },

  delete: function(req, res) {
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
  },

  getProducts: function(req, res) {
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
  }
};