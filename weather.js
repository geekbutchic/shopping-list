let weather = {
    //ATTACHES KEY FROM URL TO API-KEY.JS FILE
    apiKey: URL,
    fetchWeather: function (city) {
      //FORMAT FOR FETCHING WEATHER FORM API 
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          this.apiKey
      )
        .then((res) => {
          if (!res.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return res.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon } = data.weather[0];
      const { temp } = data.main;
      
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
   
      document.querySelector(".temp").innerText = temp + "°F";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document
  .querySelector(".search button")
  .addEventListener("click", () => {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", (event) => {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Scottsdale");