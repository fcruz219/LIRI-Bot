require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var fs = require("fs")
var moment = require("moment");

var userinput = process.argv
var action = userinput[2];
var value = userinput[3];


for (i = 4; i < userinput.length; i++) {
    value += '+' + userinput[i];
}
function randomizer(){
switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotifysearch();
        break;

    case "movie-this":
        omdb();
        break;

    case "do-what-it-says":
        random();
        break;
}
}
randomizer();

// SPOTIFY
function spotifysearch() {

    spotify
        .search({ type: 'track', query: value, limit: 1 })
        .then(function (response) {
            console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
            console.log("Song Name: " + response.tracks.items[0].name);
            console.log("song Preview: " + response.tracks.items[0].preview_url);
            console.log("Album Name: " + response.tracks.items[0].album.name)
        })
        .catch(function (err) {
            console.log(err)
        });


};

// OMDB
function omdb() {


    // console.log(movieUrl);

    var movieUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    axios.get(movieUrl).then(
        function (response) {
            if (value === '') {
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


    var bandsUrl = "https://rest.bandsintown.com/artists/" + value + "/events/?app_id=codingbootcamp"
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
    console.log('yes');
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        var dataArr = data.split(",");
        console.log(dataArr);
        var dataArr2 = dataArr[1].split(" ")

        console.log(dataArr2)
        action = dataArr[0];
        value = dataArr2[0]
        for (i = 1; i < dataArr2.length; i++) {
            value += "+" + dataArr2[i]
        }
        console.log(value)
        console.log(action)
        randomizer()
    })


}