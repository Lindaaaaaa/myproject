console.log("Haha!");
var mymap;
var markers = [];
var iterator = 0;
console.log("good!");

function initializeDisabilityCars() {
    var neighborhoods = [
new google.maps.LatLng(49.262, -123.243),
new google.maps.LatLng(49.263, -123.248),
new google.maps.LatLng(49.264, -123.247),
new google.maps.LatLng(49.261, -123.246)
    ];
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (p) {

                var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                var mapOptions = {
                    center: LatLng,
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                mymap = new google.maps.Map(document.getElementById("divMap"), mapOptions);
                console.log(mymap);
                var kmlUrl = 'http://data.vancouver.ca/download/kml/disability_parking.kmz';
                var kmlOptions = {
                    suppressInfoWindows: true,
                    preserveViewport: false,
                    map: mymap
                };
                var kmlLayer = new google.maps.KmlLayer(kmlUrl, kmlOptions);
                //this part is for adding markers should addMarker should be called in index.jade
                console.log("begin add marker");
                addMarker();
                console.log("have markers array");
                console.log(markers);


                function addMarker() {
                    for (var i = 0; i < neighborhoods.length; i++) {
                        console.log("getExexuted")
                        addOneMarker();
                    }
                }
                function addOneMarker() {
                    markers.push(new google.maps.Marker({
                        position: neighborhoods[iterator],
                        title:"<div style = 'height:60px;width:300px'><b>Your location:</b><br />Latitude: " +neighborhoods[iterator][0],
                        map: mymap,
                        draggable: true,
                    }));
                    iterator++;
                    console.log(iterator);
                }
                var marker = new google.maps.Marker({
                    position: LatLng,
                    map: mymap,
                    title: "<div style = 'height:60px;width:300px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
                });
                var circle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    map: mymap,
                    center: LatLng,
                    radius: 650
                });
                google.maps.event.addListener(marker, "click", function (e) {
                    var infoWindow = new google.maps.InfoWindow();
                    infoWindow.setContent(marker.title);
                    infoWindow.open(mymap, marker);
                });
            });
    } else {
        console.log("else!");
        alert('Geo Location feature is not supported in this browser.');
    }
}
function disableButton(){
    document.getElementById("car").disabled = 'true';
}
console.log("end!");
console.log(mymap);




