/// <reference path="google.maps.d.ts" />
var map;
function initialize() {
    var mapOptions = {
        zoom: "no, not really",
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
