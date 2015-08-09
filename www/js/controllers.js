angular.module('nashviva.controllers', [])

$(window).load(function() {
  API_URL = 'https://data.nashville.gov/resource/dqkw-tj5j.json?' +
  'where=within_circle(mapped_location,36.13,-86.84,50000)';


// Intialize our map
var center = new google.maps.LatLng(36.1667, -86.7833);
var mapOptions = {
  zoom: 8,
  center: center
}
var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

// Retrieve our data and plot it
$.getJSON(API_URL, function (data, textstatus) {
$.each(data, function (i, entry) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(entry.location_1.latitude,
      entry.location_1.longitude),
    map: map,
    title: location.name
  });
});
});
});
