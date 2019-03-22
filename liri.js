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

    var track = ''

    var spotify = new Spotify(keys.spotify);
    // if (!value) {
    //     value = 'The Sign';
    // }
    for (i = 3; i < value.length; i++) {
        track += value[i] + '+';
    }

    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

    
});

}
// OMDB
function omdb() {

    var movieName = ''



    // console.log(movieUrl);

    for (i = 3; i < value.length; i++) {
        movieName += value[i] + '+';
    }

    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(movieUrl).then(
        function (response) {
            if (movieName === '') {
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
                console.log("It's on Netflix!")
    
            }
            else {
            // console.log(response.data)
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("Imdb Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            }
        })

        
}

// BANDS IN TOWN
function concert() {
    var artist = ''

    for (var i = 3; i < value.length; i++) {

        if (i > 3 && i < value.length) {
            artist = artist + "+" + value[i];
        }
        else {
            artist += value[i];

        }
    }


    var bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=codingbootcamp"
    console.log(bandsUrl)

    axios.get(bandsUrl).then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {


                //  console.log(response.data);
                console.log("Venue name: " + response.data[i].venue.name);
                console.log("Venue date: " + response.data[i].venue.city);
                console.log("Date of event: " + moment(response.data[i].datetime).format("L"));
            }
        });

}


// DO WHAT IT SAYS
function random() {

}