const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=52879cdd7018ddf7af8901a7ab749a69&query=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      
      callback(
        undefined,
        response.body.current.weather_descriptions +
          ". It is currently " +
          response.body.current.temperature +
          " degree out. There is " +
          response.body.current.precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
