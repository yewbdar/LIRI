# liri-node-app
Liri is a CLI node app that takes commands and perform searches for the user and logs out the results to the terminal.
#Getting started
For users who would like to demo the app or modify it, simply clone the repo. And you will need to run npm install to attach the necessary dependencies for this application.

 -The .env file you create should look like the following:

  Spotify API keys

   SPOTIFY_ID=yourID SPOTIFY_SECRET=yourSecret

  Twitter API keys

  TWITTER_CONSUMER_KEY=yourKey TWITTER_CONSUMER_SECRET=yourSecret TWITTER_ACCESS_TOKEN_KEY=yourToken       TWITTER_ACCESS_TOKEN_SECRET=yourTokenSecret

After you got those keys ,You can run the following command in terminal to get an output .
 1. node liri.js movie-this 
  - An optional fourth argument can be input by the user which will be the title of the movie he/she wishes to query. If          the user leaves out the optional fourth argument, the default choice of 'Mr. Nobody' will be used instead of user input.
 2. node liri.js my-tweets 
   -the optional fourth argument can be the screen name of the twitter user whose tweets this user wishes to display. If this     argument is left blank, the default user is my 'dummy' account.
 3.node liri.js potify-this-song
    -the optional fourth argument should be the song the user wishes to query or link to. If this input is left undefined, the default search is set to 'perfect' by ed sheeran.
 
#Technology used
-node js 
-node packages
   -node-spotify-api: to spotify song
   -omdb API: to send movie queries to IMDB
   -twitter: to get users tweets 
#Built with
-visual code -terminal

Authors
yewbdar girma

Acknowledgment
All stack overflow contributer UT,bootcamp instractours
