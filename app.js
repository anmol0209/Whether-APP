const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const country = req.body.country;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    country +
    "&%20=metric&appid=8f9158d6c59bb58526ad16d43e6f1280";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weather_data = JSON.parse(data);

      const des = weather_data.weather[0].description;

      const icon = weather_data.weather[0].icon;
      const img_url = "https://openweathermap.org/img/wn/" + icon + ".png";

      console.log(des);
      console.log(icon);
      res.write("<p> The icon id is " + icon + "</p>");
      res.write("<h1>The description is " + des + " </h1>");
      res.write("<img src= " + img_url + ">");
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on 3000 port ");
});
