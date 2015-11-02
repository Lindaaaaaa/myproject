///<reference path='..\..\types/DefinitelyTyped/googlemaps/google.maps.d.ts'/>
///<reference path='..\..\types/DefinitelyTyped/markerclustererplus/markerclustererplus.d.ts'/>
var Mapping;
(function (Mapping) {
    var GoogleMap = (function () {
        function GoogleMap(mapDiv, type) {
            this.name = type;
            this.options = {
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: new google.maps.LatLng(49.2827, -123.2)
            };
            this.map = new google.maps.Map(mapDiv, this.options);
            var circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                center: new google.maps.LatLng(+49.2617063, -123.2547626),
                radius: 2000
            });
            this.showCurrentLocation();
            switch (type) {
                case "DisabilityCar":
                    var kmlUrl = 'http://data.vancouver.ca/download/kml/disability_parking.kmz';
                    var kmlOptions = {
                        suppressInfoWindows: true,
                        preserveViewport: true,
                        map: this.map
                    };
                    console.log("hi!");
                    new google.maps.KmlLayer(kmlUrl, kmlOptions);
                    this.addMarkers([[49.272, -123.252], [49.2712, -123.2523], [49.2728, -123.24]]);
                    break;
                case "Bike":
                    this.addMarkers([[49.271, -123.253], [49.270, -123.222], [49.272, -123.272]]);
                    break;
                case "MotorBike":
                    var kmlUrl = 'http://data.vancouver.ca/download/kml/motorcycle_parking.kmz';
                    var kmlOptions = {
                        suppressInfoWindows: true,
                        preserveViewport: true,
                        map: this.map
                    };
                    console.log("hi!");
                    new google.maps.KmlLayer(kmlUrl, kmlOptions).setMap(this.map);
                    console.log("hi!!");
                    this.addMarkers([[49.273, -123.2534], [49.232, -123.252], [49.282, -123.251]]);
                    break;
            }
        }
        GoogleMap.prototype.showCurrentLocation = function () {
            var myLatLng = this.getMyLatLng();
            console.log("my position" + "" + myLatLng);
            var mymarker;
            mymarker = new google.maps.Marker({
                position: new google.maps.LatLng(+49.2617063, -123.2547626),
                map: this.map,
                animation: google.maps.Animation.BOUNCE,
                title: "Your location is 49.2617063,-123.2547263 "
            });
            google.maps.event.addListener(mymarker, "click", function (e) {
                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent(mymarker.getTitle());
                infoWindow.open(this.map, mymarker);
            });
        };
        GoogleMap.prototype.getMyLatLng = function () {
            var LatLng;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (p) {
                    LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
                    console.log("haha" + "" + LatLng);
                });
            }
            console.log("finish getMyLatLng");
        };
        GoogleMap.prototype.addOneMarker = function (lat, lng) {
            console.log("get called");
            var marker;
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: this.map,
                title: "location is" + lat + "," + lng
            });
            console.log(marker.getMap());
            console.log(lat);
            google.maps.event.addListener(marker, "click", function (e) {
                var infoWindow = new google.maps.InfoWindow();
                infoWindow.setContent(marker.getTitle());
                infoWindow.open(this.map, marker);
            });
        };
        GoogleMap.prototype.addMarkers = function (locs) {
            for (var i = 0; i < locs.length; i++) {
                this.addOneMarker(locs[i][0], locs[i][1]);
            }
        };
        return GoogleMap;
    })();
    Mapping.GoogleMap = GoogleMap;
})(Mapping || (Mapping = {}));
//# sourceMappingURL=googlemap.js.map