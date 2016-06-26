var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST

exports.index = (req, res) => {
  console.log(" :) ");
  mongoose.model('Message').find({}, function (err, messages) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/blobs folder. We are also setting "blobs" to be an accessible variable in our jade view
                    html: function(){
                        res.json(messages);
                    },
                    //JSON response will show all blobs in JSON format
                    json: function(){
                        res.json(messages);
                    }
                });
              }
        });
};
