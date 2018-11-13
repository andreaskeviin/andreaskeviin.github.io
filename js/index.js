function initialize() {
  var address = (document.getElementById('location'));
  var autocomplete = new google.maps.places.Autocomplete(address);
  autocomplete.setTypes(['geocode']);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
          return;
      }

  var address = '';
  if (place.address_components) {
      address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
  }
  });
}
function getWeather() {
  var latitut;
  var longitut
  var location;
  geocoder = new google.maps.Geocoder();
  var address = document.getElementById("location").value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

    latitut= results[0].geometry.location.lat();
    longitut= results[0].geometry.location.lng();
    } 

    else {
      alert("Geocode was not successful for the following reason: " + status);
    }
    location = latitut + ", " +longitut;
    getURL(location);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);


function getURL(location, tempSetting) {
  var url = ("https://api.darksky.net/forecast/d0008617a32ab7c3cae043cb95a96db9/" + location +"?units=si");
  //console.log(url);
  getJson(url);

}

function getJson(url) {
  //console.log("started getJson with this url: " + url);

  $.ajax({
      format: "jsonp",
      dataType: "jsonp",
      url: url,
      success: function(json) {
        //console.log("great success");
        $("#weather-name").html(json.currently.summary);
        $("#weather-current").html(Math.round(json.currently.temperature) + "°");
        $("#weather-high").html("High: " + Math.round(json.daily.data[0].temperatureMax) + "°c");
        $("#weather-low").html("Low: " + Math.round(json.daily.data[0].temperatureMin) + "°c");
        setBackground(json.currently.icon);
      }

    })
    .error(function(jqXHR, textStatus, errorThrown) {
      alert("error: " + JSON.stringify(jqXHR));
    })
}


function setBackground(weatherIcon) {
  //console.log(weatherIcon);
  switch (weatherIcon) {
    case "clear-day":
      document.getElementById("body").style.backgroundImage = 'url("http://feelgrafix.com/data_images/out/15/899301-sunny-day.jpg")';
      break;
    case "clear-night":
      document.getElementById("body").style.backgroundImage = 'url("https://tcklusman.files.wordpress.com/2014/05/tumblr_static_dark-starry-night-sky-226736.jpg")';
      break;
    case "rain":
      document.getElementById("body").style.backgroundImage = 'url("http://wearechange.org/wp-content/uploads/2015/03/1_See_It.jpg")';
      break;
    case "cloudy":
      document.getElementById("body").style.backgroundImage = 'url("http://www.tripwire.com/state-of-security/wp-content/uploads/cache//shutterstock_106367810/4261234929.jpg")';
      break;
    case "partly-cloudy-day":
      document.getElementById("body").style.backgroundImage = 'url("http://www.sturdyforcommonthings.com/wp-content/uploads/2013/03/wind_blowing.jpg")';
      break;
    case "partly-cloudy-night":
      document.getElementById("body").style.backgroundImage = 'url("http://scienceblogs.com/startswithabang/files/2013/04/night-sky-stars.jpeg")';
      break;
    case "snow":
      document.getElementById("body").style.backgroundImage = 'url("http://www.vancitybuzz.com/wp-content/uploads/2015/12/shutterstock_315123593-984x500.jpg")';
      break;
    default:
      break;

  }

}