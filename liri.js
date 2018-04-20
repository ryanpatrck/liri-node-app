

//Grab data from dotenv file
require("dotenv").config();
var request= require('request')
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);

//Stored arguemtn's array
var nodeArgv = process.argv;
var command = process.argv[2];
// movie or song
var x = "";

//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
    if(i>3 && i<nodeArgv.length){
      x = x + "+" + nodeArgv[i];
    } else{
      x = x + nodeArgv[i];
    }
  }
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
var artistName = function(artist) {
    return artist.name;
}
var spotifyMe = function(songName){
    spotify.search({ type: 'track', query: songName, limit:1 }, function(err, data) {
        if (err) {
         console.log('Error occurred: ' + err);
          return;
        }

        var songs = data.tracks.items;
        for (var i=0; i<songs.length; i++){
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(artistName));
            console.log('song name: '+songs[i].name);
            console.log('preview song: '+ songs[i].preview_url);
            console.log('album: '+songs[i].album.name);
            console.log('----------------------');
        }
       
    
      });

}
var MovieMe = function(movieName){
    var omdbURL = 'http://www.omdbapi.com/?apikey=trilogy&t='+ movieName + '&plot=short&tomatoes=true';
    
    request(omdbURL, function (error, response, body){
        if(!error && response.statusCode == 200){
          var jsonData = JSON.parse(body);
    

    console.log('Title: ' +jsonData.Title);
    console.log('Year: '+jsonData.Year);
    console.log('Rated: '+jsonData.Rated);
    console.log('IMDB Rating: ' + jsonData.imdbRating);
    console.log('Language: ' + jsonData.Language);
    console.log('Plot: '+ jsonData.Plot);
    console.log('Actors: '+ jsonData.Actors);
    console.log('Rotten tomatoes rating: '+ jsonData.tomatoRating);

    }
});
    
}
var whatItSays = function(){
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
      
        var dataArray = data.split(',');

        if (dataArray.length == 2) {
            picks(dataArray[0], dataArray[1]);
        } else if (dataArray.length == 1) {
            picks(dataArray[0]);
        }
      });
    
}




var picks = function(caseData, functionData){
    switch(caseData){
        case 'my-tweets' :
        getMyTweets();
        break;
        
        case 'spotify-this-song':
       if (x){ spotifyMe(functionData)
       } else {
           spotifyMe("The Sign");
       }
       break;

       case 'movie-this':
       if (x){ MovieMe(functionData)
        } else {
            movieMe("Mr. Nobody")
        }
        break;
        case 'do-what-it-says':
        whatItSays();
        break;
        default:
        console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    picks(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
