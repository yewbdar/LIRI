require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var doWhatItIS = false;
switch (command) {
    case 'my-tweets':

        tweets();

        break;

    case 'spotify-this-song':

    spotifyMusic();

        break;
    case 'movie-this':

        movie();

        break;
    case 'do-what-it-says':

        doWhatItSays();

        break;

}
function tweets() {
    var params = { screen_name: 'yewbdar GG', count: "20" };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }

        }
    });
}
function spotifyMusic(name) {
    ;
    if(doWhatItIS){
        var musicTitle=name;
    }
    else{
    var musicTitle=process.argv[3];
    }
    spotify.search({ type: 'artist', query: musicTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

function movie(movieName) {
    if (doWhatItIS) {
        movie = movieName;
    }
    else {
        var movie = process.argv[3];
        for (var i = 4; i < process.argv.length; i++) {

            movie += "+" + process.argv[i];

        }
    }
    var request = require("request");

    if (movie !== undefined) {
        
        request("http://www.omdbapi.com/?t=" + movie + "=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log("Title of the movie: " + JSON.parse(body).Title);
                console.log("Year the movie came out: " + JSON.parse(body).Year);
                console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
                if (JSON.parse(body).Ratings.length > 0) {
                    console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
                }
                console.log("Country where the movie was produced: " + JSON.parse(body).Country);
                console.log("Language of the movie: " + JSON.parse(body).Language);
                console.log("Plot of the movie: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);

            }
        });
    }
    else {

        console.log("If you haven't watched " + '"Mr. Nobody,"' + " then you should:");
        console.log('<http://www.imdb.com/title/tt0485947/>');
        console.log("It's on Netflix!");

    }
}
function doWhatItSays() {
    doWhatItIS = true;
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        
        var dataArr = data.split(",")
        command = dataArr[0];
        Name = dataArr[1].split("\n");
         console.log(command);
         console.log(Name);

        switch (command) {
            case "movie-this":
                movie(Name);
                break;
            case "spotify-this-song":
            spotifyMusic(Name);
                break;

        }

    })
}











