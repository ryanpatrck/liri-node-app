require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);


var getMyTweets = function(){
    var client = new Twitter(keys.twitter);

var params = {screen_name: 'ryanpatrck1'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    for (var i=0; i<tweets.length; i++){
    console.log(tweets[i].created_at);
    console.log(' ');
    console.log(tweets[i].text);
    }
  }
});

}
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[0]); 
  });
var picks = function(caseData, functionData){
    switch(caseData){
        case 'my-tweets' :
        getMyTweets();
        break;
        default:
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    picks(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
