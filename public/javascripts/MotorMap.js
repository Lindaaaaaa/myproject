console.log("Haha!");
var mymap;
var markers2 = [];
var iterator = 0;
console.log("good!");

function initializeMotorBike() {
    var neighborhoods = [
new google.maps.LatLng(49.268, -123.243),
new google.maps.LatLng(49.2713, -123.248),
new google.maps.LatLng(49.2319, -123.247),
new google.maps.LatLng(49.2387, -123.246)
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
                //this part is for adding markers should addMarker should be called in index.jade
                addMarker();
                function addMarker() {
                    for (var i = 0; i < neighborhoods.length; i++) {
                        console.log("getExexuted")
                        addOneMarker();
                    }
                }
                function addOneMarker() {
                    if (markers2.length < 4) {
                        markers2.push(new google.maps.Marker({
                            position: neighborhoods[iterator],
                            map: mymap,
                            draggable: true,
                        }));
                        iterator++;
                        console.log(iterator);
                    }
                    else
                        return;
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
function disableButton2(){
    document.getElementById("bike").disabled = 'true';
}
console.log("end!");
console.log(mymap);