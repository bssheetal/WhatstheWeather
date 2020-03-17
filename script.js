$(document).ready(function() {
    $("#search-button").on("click", function() {
      var searchValue = $("#search-value").val();
  
      // clear input box
      $("#search-value").val("");
      console.log("search value is"+searchValue);
      searchWeather(searchValue);

    });

    
    function searchWeather(searchValue)
    {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue +"&appid=60f54ac03ed7a4b3ce28598e56d34aee",
            method: 'GET'
        }).then(function(response) {
            console.log(response);
        });

        
    }

    
});