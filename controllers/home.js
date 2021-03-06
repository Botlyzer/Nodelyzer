var csvWriter = require('csv-write-stream')
var mongoose = require('mongoose')
var fs = require('fs')
var writer = csvWriter({ headers: ["name","word","count"]})
var request = require('request-json');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.getPopularWords = (req, res) => {
  if(req.user){
    console.log('public/data/' + req.user._id + '.csv');
    mongoose.model('Chatsession').find({userid: req.user._id}, function (err, chatsession) {
                if (err) {
                    return console.error(err);
                } else {
                  var words = Array();
                    for (var i = 0; i < chatsession.length; i++) {
                      for (var j = 0; j < chatsession[i].chat.length; j++) {
                        var phrase = chatsession[i].chat[j].user.message.split(" ");
                        for (var z = 0; z < phrase.length; z++) {
                          words.push(phrase[z]);
                        }
                      }
                    }
                    var meta = foo(words);
                    if(meta){
                      writer.pipe(fs.createWriteStream('public/data/' + req.user._id + '.csv'))
                      for (var i = 0; i < meta[0].length; i++) {
                        writer.write({name: meta[0][i], word: meta[0][i], count: meta[1][i]})
                      }
                    }
                    writer.end();
                    res.send(":D");
                }
          });
  }
};

exports.getPrediction = (req, res) => {
  var userid =  req.user._id ;//req.body.userid;
  var client = request.createClient('http://hec44.pythonanywhere.com');

  mongoose.model('Chatsession').find({userid: userid}, function (err, chatsession) {
              if (err) {
                  return console.error(err);
              } else {
                  client.post('/', chatsession, function(err, response, body) {
                    console.log(response.body);
                    fs.writeFile('public/data/feeling.json', JSON.stringify(response.body), function (err) {
                      if (err) return console.log(err);
                      console.log('Hello World > helloworld.txt');
                    });
                    res.send("Hola");
                  });
              }
        });
};

function foo(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}
