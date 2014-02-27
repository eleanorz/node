module.exports = function Route(app){
	app.get('/', function(req, res){
			res.render('index', {title:'Welcome Page'});
	});
	app.get('/index_w_form', function(req, res){
			res.render('index_w_form', {title:'Forms yall'});
	});
	app.get('/dojo', function(req, res){
			res.render('dojo', {title:'Dojo Page', data: 'Hi'});
	});
	app.get('/eleanor', function(req, res){
			res.render('eleanor', {title:'Eleanor is awesome', witty: 'why did the chicken cross the road?'});
	});
	app.post('/process', function(req, res){
			console.log('POST INFO', req.body);
			req.session.name = req.body.my_name;
			req.session.email = req.body.email;
			req.session.sessionID = req.sessionID; //unique session id
			console.log('logging session data', req.session);
			req.session.save(function() {
				res.redirect('/');
		});
	})
}

// Broadcast the new visitor event on ready route.
app.io.route('ready', function(req) {
    req.io.broadcast('new visitor');
})
// Send client html.
app.get('/', function(req, res) {
    res.render('client');
})
app.listen(7076)