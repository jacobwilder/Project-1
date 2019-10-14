// user chooses a type of cuisines from dropdown menue ,
// and a picture of that food type comes up and stays on a page;
// user chooses a type of genres from dropdown menue,
// and a picture of that genre type comes up and stays on a page;
// maybe a plus sign comes up bettween them
// based on user choice of food and genre,
// we give them options (combined together: food and genre of movie) what we think is
// good together (food and movie) taken from yelp API and movie website API.
// The result is going to show up on the same page, where we won't see dropdown menus
// we see right now.

//--------------------- KEVS STUFF ------------------
// --------------- VARS
$(document).ready(function () {
      var yelpKey =
        "WryFK_Fia6X6mI7Qo4GXKpsgXq28PtJo4fj-JCC53ggv5E7izVZ--ynGA62pamf8jZgp-o7nqhqV1EEODABa0bZYmHX8bI7S-DZMtDQv0Ws0WDImLt2JRL_u31OfXXYx";
      var yelpQueryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search`;
      var foodChoice = "";

      // ----- AJAX CALL FOR RESTAURANTS
$(".wrapperOne").hide();
$(".wrapperTwo").hide();

      function searchYelp(userLocation, foodChoice) {
        $.ajax({
            type: "GET",
            url: yelpQueryURL,
            headers: {
              Authorization: "Bearer " + yelpKey
            },
            data: {
              term: foodChoice,
              location: userLocation
            }
          })
          .then(function (response) {
            console.log(response);
            foodChoice = "";
            $("#typeHere").val("");
            console.log(foodChoice);
            //console.table(response.businesses);
            var randomIndex = Math.floor(
              //Chris added this section from Kev //
              Math.random() * (response.businesses.length - 1)
            );
            console.log(response);
            var getName = $(".restaurant-name").text(
              response.businesses[randomIndex].name
            );
            console.log(getName);

            var getAddressStreetOne = $(".restaurant-address").text(
              response.businesses[randomIndex].location.address1
            );
            console.log(getAddressStreetOne);

            var getAddressStreetTwo = $(".restaurant-address").append(
              " " + response.businesses[randomIndex].location.address2
            );
            console.log(
              getAddressStreetTwo
            ); /* This is for the second address line. ie if there is an apartment number/suite number it'll list here. THIS NEEDS TO BE TESTED ON A WORKING SUITE/APRT ADDRESS*/

            var getAddressCity = $(".restaurant-address-city").text(
              " " + response.businesses[randomIndex].location.city
            );
            console.log(getAddressCity);

            var getAddressZip = $(".restaurant-address-zip").text(
              " " + response.businesses[randomIndex].location.zip_code
            );
            console.log(getAddressZip);

            var getPhone = $(".restaurant-phone").text(
              "Phone: " + response.businesses[randomIndex].phone
            );
            console.log(getPhone);

            var getRating = $(".restaurant-rating").text(
              "Rating: " + response.businesses[randomIndex].rating + "/5"
            );

            $("#restaurantImg").attr("src", response.businesses[randomIndex].image_url);
            $("#restaurantImg").attr("width", "200px");
            $("#restaurantImg").attr("height", "200px");

            console.log(getRating);
            //console.clear();
            response.businesses.forEach(function (e) {
              //console.table(e.transactions);
            });

            console.log(response.businesses[randomIndex].transactions);
            if (
              response.businesses[randomIndex].transactions.indexOf("delivery") > -1
            ) {
              $(".restaurant-deliver").text("Delivery Available!");
              console.log(
                response.businesses[randomIndex].transactions.indexOf("delivery")
              );
            } else {
              $(".restaurant-deliver").text("Pickup Only");
            }
$(".wrapperOne").show();

          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // searchYelp("");

      $("#btnOne").on("click", function (event) {
        event.preventDefault();
        var zipNum = $("#typeHere")
          .val()
          .trim();
        console.log(zipNum);
        if (zipNum.length === 5 && zipNum.match(/^\d+$/) && foodChoice !== "") {
          console.log("zipcode = 5");
          searchYelp(zipNum, foodChoice);
        } else {
          alert("USE SWEETALERT");
        }
      })

      // Chris testing Kevin's randomization
      // var randomArray = [];

      // function RandoResults() {
      //   for (i=0; i<response.length; i++) {
      //     var randomText = response.businesses.results[randomIndex]
      //   ;}
      //   $("WHERE??").text(randomText);

      // }

      $("#dropdownMenu2").on("click", function (event) {
        event.preventDefault();
      });

      $(".food-search").on("click", function (event) {
        var searchTerm = event.target.value;
        var foodString = $(this).text();
        foodChoice = searchTerm;
        console.log(foodChoice);
        $("#dropdownMenu2").text(foodString);
      });

      $(".genre-search").on("click", function (event) {
        var movieSearchTerm = event.target.value;
        var movieSearchString = $(this).text();
        console.log(movieSearchTerm);
        searchMovie(movieSearchTerm);
        $("#dropdownMenu3").text(movieSearchString);
        $(".wrapperTwo").show();
      });
      // ----- TO DO ----
      // Randomize restaurant results - for loop
      // THERE IS A SECOND ADDRESS LINE FOR SUITE AND APARTMENTS, DON'T FORGET IN THE CSS.
      //--------------------- END KEVS STUFF ------------------


      //-----Jake's Work-----//
      //-----TO DO-----//
      // Find a way to chain response modal with quiz complete modal
      // input movie database API
      //Edit CSS to reformat buttons and pages



      


        // Chris testing Kevin's randomization
        // var randomArray = [];

        // function RandoResults() {
        //   for (i=0; i<response.length; i++) {
        //     var randomText = response.businesses.results[randomIndex]
        //   ;}
        //   $("WHERE??").text(randomText);

        // }

        // ----- TO DO ----
        // Randomize restaurant results - for loop
        // THERE IS A SECOND ADDRESS LINE FOR SUITE AND APARTMENTS, DON'T FORGET IN THE CSS.
        //--------------------- END KEVS STUFF ------------------

        //-----Jake's Work-----//
        //-----TO DO-----//
        // Find a way to chain response modal with quiz complete modal
        // input movie database API
        //Edit CSS to reformat buttons and pages

        
        // AJAX FUNCTION TMDB

        function searchMovie(movieSearchTerm) {
          var movieAPI = "9c78f7f7ceee5681298aabdde3007043";
          var movieURL =
            "https://api.themoviedb.org/3/discover/movie?api_key=" +
            movieAPI +
            "&with_genres=" +
            movieSearchTerm;

          $.ajax({
            type: "GET",
            url: movieURL,
            header: {
              authorization: "Bearer " + movieAPI
            }
          }).then(function (response) {
            console.log(response);
            console.log(movieURL);
            var randomMovieIndex = Math.floor(
              Math.random() * (response.results.length - 1)
            );
            var getMovieName = $(".movie-title").text(
              response.results[randomMovieIndex].original_title
            );

            $("#movieImg").attr(
              "src",
              "https://image.tmdb.org/t/p/w200" +
              response.results[randomMovieIndex].poster_path
            );
            var getMoviePlot = $(".movie-plot").text(
              response.results[randomMovieIndex].overview
            );
            $(".movie-title").prepend(getMovieName);
            $(".movie-plot").append(getMoviePlot);
          });
        }
      });