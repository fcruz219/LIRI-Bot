require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var action = process.argv[2];
var value = process.argv;

switch (action) {
    case "concert-this":
      concert();
      break;
    
    case "spotify-this-song":
      spotify();
      break;
    
    case "movie-this":
      omdb();
      break;
    
    case "do-what-it-says":
      random();
      break;
    }
// SPOTIFY
function spotify() {
var spotify = new Spotify(keys.spotify);

}


// OMDB
function omdb(){

    var movieName = ''



    // console.log(movieUrl);

    for(i = 3; i < value.length; i++) {
        movieName += value[i] + '+';
    }

      var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(movieUrl).then(
        function(response) {
            // console.log(response.data)
          console.log("Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("Imdb Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        })
}

// BANDS IN TOWN
function concert(){

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){

    })
    }


// // DO WHAT IT SAYS
// function random() {

// }