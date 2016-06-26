var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var request = require('request-json');

const Chatsession = require('../../../models/Chatsession');


exports.index = (req, res) => {
  mongoose.model('Chatsession').find({}, function (err, chatsession) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.json(chatsession);
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(chatsession);
                    }
                });
              }
        });
};

exports.analysis = (req, res) => {
  var userid =  "576f665d6eaa033b275216d2";//req.body.userid;
  var client = request.createClient('http://requestb.in');



  mongoose.model('Chatsession').find({userid: userid}, function (err, chatsession) {
              if (err) {
                  return console.error(err);
              } else {
                  client.post('/1j5cghb1', chatsession, function(err, response, body) {
                    res.send(response.statusCode);
                  });
              }
        });

};

exports.postChatsession = (req, res) => {
  var userid = req.body.userid;
  var chat = req.body.chat;

  //call the create function for our database
  mongoose.model('Chatsession').create({
      userid : userid,
      chat : chat
  }, function (err, chatsession) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            //Blob has been created
            console.log('POST creating new user: ' + chatsession);
            res.format({
                //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
              html: function(){
                  // If it worked, set the header so the address bar doesn't still say /adduser
                  res.location("chatsession");
                  // And forward to success page
                  res.redirect("/api/v1/chatsession");
              },
              //JSON response will show the newly created blob
              json: function(){
                  res.json(chatsession);
              }
          });
        }
  });
};
