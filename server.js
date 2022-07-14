var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require('./models/user');
var bcrypt=require('./models/user');
var hbs = require('hbs');

//var hbs = require('express-handlebars'); 
var path = require('path');
const jwt = require('jsonwebtoken');

// invoke an instance of express application.
var app = express();


// set our application port 
app.set('port', 9000);

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        maxAge: oneDay,
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

//// middleware function to check for logged-in users
function CreateToken(req,res,next){
    const user = {username :req.body.username,
                  password :req.body.password}
    jwt.sign(user,secretkey,(err,resultat)=>{
        if(err){
            res.json({error:err})
        }else{
            res.json({token:resultat})
        }
    });
        next()
}
// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
		 // res.redirect('/dashboard');
         res.json({
            message: "welcome to /dashboard"
         });
    } else {
        next();
    }    
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
 //  res.redirect('/login');
 res.json({
    message: "welcome /login"
 });
});


// route for user signup
app.route('/signup')
    .get((req, res) => {
      //  res.render('signup', hbsContent);
      res.json({
        message: "welcome to /signup"
     });
    })
    .post((req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
           // res.redirect('/dashboard');
           res.json({
            message: "/dashborad"
         });
        })
        .catch(error => {
          //  res.redirect('/signup');
          return;
        });
    });


// route for user Login
app.route('/login', CreateToken)
    .get(sessionChecker, (req, res) => {
    //    res.render('login', hbsContent);
    res.json({
        message: "welcome to /login"
     });
    })
    .post((req, res) => {
        var username = req.body.username,
            password = req.body.password;

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
               // res.redirect('/login');
               return;
               res.json({
                message: "invalid user"
            });

             } else if (!user.validPassword(password)) {
                //res.redirect('/login');
                return;
                res.json({
                    message: "invalid mot de passe"
                });

            } else {
                req.session.user = user.dataValues;
               // res.redirect('/dashboard');
               res.json({
                message: "welcome to /dashbord"
             });
            }
        });
    });


// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		//hbsContent.loggedin = true; 
		//hbsContent.userName = req.session.user.username; 
		console.log(req.session.user.username); 
		hbsContent.title = "You are logged in"; 
      //  res.render('index', hbsContent);
      res.json({
        message: "welcome to /dashbord"
     });
    } else {
     //   res.redirect('/login');
     return;
    }
});


// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
		hbsContent.loggedin = false; 
		hbsContent.title = "You are logged out!"; 
        res.clearCookie('user_sid');
		console.log(JSON.stringify(hbsContent)); 
        res.redirect('/');
    } else {
       // res.redirect('/login');
       res.json({
        message: "log out back to /login"
     });
    }
});


// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});


// start the express server
app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

 
