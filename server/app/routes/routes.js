module.exports = function(app, passport) {
    
    // send to instagram to do the authentication
		app.get('/connect/instagram/', passport.authenticate('instagram'), function(req, res){});

		// handle the callback after instagram has authorized the user
		app.get('/connect/instagram/callback',
            passport.authenticate('instagram', { failureRedirect: '/' }),
            function(req, res) {
            res.redirect('/#/dashboard');
        });
    
};