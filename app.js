const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/",(req,res)=>{
    const cityName = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=7bda815f58055d0e3742dc5ac48c07f6&units=imperial";
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescrip = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temprature in " + cityName + ": " + temp +"</h1>");
            res.write("<p>The Weather is " + weatherDescrip + "<p>");
            res.write("<img src=" + imageIcon + ">");
            res.send();
        })
    })
});

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
});
