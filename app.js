const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = '221a933a7acb42476138016f402d971b'
  const unit = 'metric';

  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query + '&units=' + unit +'&appid=' + apiKey;
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {
      const weatherData = JSON.parse(data);

      let temp = weatherData.main.temp;
      let description = weatherData.weather[0].description;
      let icon = weatherData.weather[0].icon;
      let iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather is currently " + description);
      res.write("<h1>The weather in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + iconURL + ">")
      res.send();
    })

  })
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
