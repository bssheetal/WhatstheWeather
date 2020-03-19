$(document).ready(function () {
    $("#search-button").on("click", function () {
        var searchValue = $("#search-value").val();

        // clear input box
        $("#search-value").val("");
        console.log("search value is" + searchValue);
        searchWeather(searchValue);

    });


    function searchWeather(searchValue) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=60f54ac03ed7a4b3ce28598e56d34aee",
            method: 'GET'
        }).then(function (data) {
            if (history.index)
                console.log(data);

            var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
            var card = $("<div>").addClass("card");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
            var cardBody = $("<div>").addClass("card-body");
            var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            title.append(img);
            cardBody.append(title, temp, humid, wind);
            card.append(cardBody);
            $("#today").append(card);
            getforecast();
        });

        function getforecast() {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q=Menifee&appid=f92b209bc59ca78b321b21929b2c998e",
                method: 'GET'
            }).then(function (response) {
                console.log(response);
                var title = new Date(response.list[0].dt_txt).toLocaleDateString();
                console.log(title);
            });
        }
    }
});