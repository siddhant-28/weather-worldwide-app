var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require("body-parser");
app.use(express.static("public"))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var PORT = process.env.PORT || 3000;

var weatherObject = {
    city: '',
    temperature: '',
    description: '',
    sunrise: '',
    sunset: '',
    imageLink: ''
};




app.get("/", function(req,res){
   res.render("home", {weatherObject: weatherObject});

})

app.post("/", function(req,res){
    var searchWeather = req.body.searchWeather;
    weatherObject['city'] = searchWeather;
    console.log(searchWeather);
    var searchQuery = 'http://api.openweathermap.org/data/2.5/weather?q='+searchWeather+'&units=metric&appid=69a22c2c229668a3701ffaf0aba1f021';
    request(searchQuery, function(error, response, body){
        if(error){
            console.log(error);
        }
        else {
            if(response.statusCode == 200){
                var parsedData = JSON.parse(body)
                //console.log(parsedData);
                if(isNaN(parsedData['main']['temp'])){
                    console.log("Number found!");
                }
                weatherObject['temperature'] = parsedData['main']['temp'];
                weatherObject["description"] = parsedData['weather'][0]['main'];
                unixSunrise = parsedData['sys']['sunrise']
                var dateRise = new Date(unixSunrise * 1000)
                var hoursRise = dateRise.getHours();
                var minutesRise = "0" + dateRise.getMinutes();

                var formattedSunrise = hoursRise + ':' + minutesRise.substr(-2);

                unixSunset = parsedData['sys']['sunset']
                console.log(unixSunset);
                var dateSet = new Date(unixSunset * 1000)
                var hoursSet = dateSet.getHours();
                var minutesSet = "0" + dateSet.getMinutes();

                var formattedSunset = hoursSet + ':' + minutesSet.substr(-2);

                weatherObject['sunrise'] = formattedSunrise;
                weatherObject['sunset'] = formattedSunset;
                console.log(weatherObject.temperature);
                res.redirect('/');
            }
        }
    })
    
});


app.listen(PORT, function(){
    console.log("Weather App now online");
})