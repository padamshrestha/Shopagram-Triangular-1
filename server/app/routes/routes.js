module.exports = function(app, passport, saveToken) {
   
    
    // send to instagram to do the authentication
		app.get('/connect/instagram', passport.authorize('instagram'));

		// handle the callback after instagram has authorized the user
		app.get('/connect/instagram/callback',
            passport.authorize('instagram'), function(req, res) {
            res.redirect('http://localhost:3000/#/dashboard');
        });
        
    
};

