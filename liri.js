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
    var loggingInfo = [];
    loggingInfo.push("*********************************My Tweets*********************************")

    var params = { screen_name: 'yewbdar GG', count: "20" };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                loggingInfo.push(tweets[i].text)
            }
            logging(loggingInfo);
        }
    });
}
function spotifyMusic(name) {
    var loggingInfo = [];
    loggingInfo.push("*********************************Search Music*********************************")

    if (doWhatItIS) {
        var musicTitle = name;
    }
    else {
        var musicTitle = process.argv[3];
    }
    spotify.search({ type: 'artist', query: musicTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
        doWhatItIS = false;
    });
}

function movie(movieName) {
    var loggingInfo = [];
    loggingInfo.push("*********************************Search Movie*********************************")

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
                loggingInfo.push("Title of the movie: " + JSON.parse(body).Title);
                console.log("Year the movie came out: " + JSON.parse(body).Year);
                loggingInfo.push("Year the movie came out: " + JSON.parse(body).Year);
                console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
                loggingInfo.push("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
                if (JSON.parse(body).Ratings.length > 0) {
                    console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
                    loggingInfo.push("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value)
                }
                console.log("Country where the movie was produced: " + JSON.parse(body).Country);
                loggingInfo.push("Country where the movie was produced: " + JSON.parse(body).Country)
                console.log("Language of the movie: " + JSON.parse(body).Language);
                loggingInfo.push("Language of the movie: " + JSON.parse(body).Language);
                console.log("Plot of the movie: " + JSON.parse(body).Plot);
                loggingInfo.push("Plot of the movie: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);
                loggingInfo.push("Actors in the movie: " + JSON.parse(body).Actors);
            }
            logging(loggingInfo);
            doWhatItIS = false;
        });
    }
    else {

        console.log("If you haven't watched " + '"Mr. Nobody,"' + " then you should:");
        loggingInfo.push("If you haven't watched " + '"Mr. Nobody,"' + " then you should:")
        console.log('<http://www.imdb.com/title/tt0485947/>');
        loggingInfo.push('<http://www.imdb.com/title/tt0485947/>')
        console.log("It's on Netflix!");
        loggingInfo.push("It's on Netflix!");
        logging(loggingInfo);
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
        // console.log(command);
        // console.log(Name);

        switch (command) {
            case "movie-this":
                movie(Name);
                break;
            case "spotify-this-song":
                spotifyMusic(Name);
                break;
            case "my-tweets":
                tweets();
                break;
        }

    })
}
function logging(data) {
    // As always, we grab the fs package to handle read/write
    var fs = require("fs");

    // We then store the textfile filename given to us from the command line
    var textFile = process.argv[2];

    // We then append the contents "Hello Kitty" into the file
    // If the file didn't exist then it gets created on the fly.
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            fs.appendFile("log.txt", data[i] + "\n", function (err) {

                // If an error was experienced we say it.
                if (err) {
                    console.log(err);
                }
            });
        }

        console.log("Content Added In Log file!");

    }
}










