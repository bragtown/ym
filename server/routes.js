var home = require('../controllers/home');
var login = require('../controllers/login');

module.exports.initialize = function(app, passport, router){
	
	router.get('/', home.sendIndex)
	//router.get('/authenticate', isLoggedIn, home.getHome);
	router.get('/logout', login.logout);
	router.post('/signup', passport.authenticate('local-signup'), login.signup);
	router.post('/login',passport.authenticate('local-login'), login.login);
	router.get('/youth', isLoggedIn, home.getYouth);
	router.post('/youth', isLoggedIn, home.addYouth);
	router.put('/youth', isLoggedIn, home.updateYouth);
	router.put('/attendance', isLoggedIn, home.attendance);
	router.delete('/youth', isLoggedIn, home.deleteYouth);
	router.put('/account', isLoggedIn, login.update);
	router.post('/newOrg', isLoggedIn, home.newOrg);
	router.post('/updateOrg', isLoggedIn, home.updateOrg);
	router.get('/getMyOrgs', isLoggedIn, home.getMyOrgs);
	router.post('/shareOrg', isLoggedIn, home.shareOrg);
	router.post('/events', isLoggedIn, home.addEvent);
	router.get('/events', isLoggedIn, home.getEvents);
	router.delete('/events', isLoggedIn, home.deleteEvent);
	app.use('/', router);
}
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	console.log('in isLoggedIn');
	res.send({redirect:'login'});
}