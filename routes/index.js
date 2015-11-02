///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../types/DefinitelyTyped/express/express.d.ts'/>  
var Router = (function () {
    function Router() {
        console.log("NEW OBJECT!");
        var express = require('express');
        var router = express.Router();
        /* GET home page. */
        router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express' });
        });
        /* GET Hello World page.*/
        router.get('/homepage', function (req, res) {
            res.render('homepage', { title: 'Welcome to park easy!' });
        });

        /* GET Userlist page. */
        router.get('/userlist', function (req, res) {
            // extracting the "db" object we passed to our http request
            var db = req.db;
            var collection = db.get('usercollection');
            // do a find and return the results as the variable "docs"
            collection.find({}, {}, function (e, docs) {
                // render userlists (which will need a corresponding Jade template),
                // giving it the userlist variable to work with, 
                // and passing our database documents to that variable
                res.render('userlist', {
                    "userlist": docs // 
                });
            });
        });
        /* GET New User page. */
        router.get('/newuser', function (req, res) {
            res.render('newuser', { title: 'Add New User' });
        });
        router.post('/adduser', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            var userName = req.body.username;
            var userEmail = req.body.useremail;
            var user = new User(userName, userEmail);
            // Set our collection
            var collection = db.get('usercollection');
            // Submit to the DB
            collection.insert({
                "username": user.getName(),
                "email": user.getEmail()
            }, function (err, doc) {
                if (err) {
                    // If it failed, return error
                    res.send("There was a problem adding the information to the database.");
                }
                else {
                    // And forward to success page
                    res.redirect("userlist");
                }
            });
        });
        module.exports = router;
    }
    return Router;
})();
var myRouter = new Router();
var User = (function () {
    function User(UserName, UserEmail) {
        this.name = UserName;
        this.email = UserEmail;
    }
    User.prototype.getName = function () { return this.name; };
    User.prototype.getEmail = function () { return this.email; };
    return User;
})();
