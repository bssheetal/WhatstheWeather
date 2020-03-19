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
            }).then(function (data) {
                console.log(data);
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
                for (var i = 0; i < data.list.length; i++) {
                    var col = $("<div>").addClass("col-md-2");
                    var card = $("<div>").addClass("card bg-primary text-white");
                    var body = $("<div>").addClass("card-body p-2");

                    var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());

                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

                    var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                    var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                    // merge together and put on page
                    col.append(card.append(body.append(title, img, p1, p2)));
                    $("#forecast .row").append(col);
                }

            });
        }
    }
});