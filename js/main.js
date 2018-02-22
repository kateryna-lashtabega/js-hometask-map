 
$(window).on('load', function(){
    var map = new google.maps.Map(document.getElementById('map'));
    var geocoder1, geocoder2;
    var poltava = {lat: 49.5899682, lng:34.5508453};
	initMap();
function initMap() {
        var poltava = {lat: 49.5899682, lng:34.5508453};
       
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: poltava,
          styles: [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#00bcff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    }
]
        
      });
  }
var address1, address2;
$('#point1-submit').on('click', function(evt){
    evt.preventDefault();
   
    geocoder1 = new google.maps.Geocoder();
    geocodeAddress(geocoder1, map);

    function geocodeAddress(geocoder1, resultsMap) {
        var address = document.getElementById('point1').value;
        geocoder1.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            return address1 = marker['position'];
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

});

$('#point2-submit').on('click', function(evt){
    evt.preventDefault();
    geocoder2 = new google.maps.Geocoder();
    geocodeAddress(geocoder2, map);

    function geocodeAddress(geocoder2, resultsMap) {
        var address = document.getElementById('point2').value;
        geocoder2.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
             address2 = marker['position'];
            //return alert(address2);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    
});
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
$('#route').on('click', function(evt){
    evt.preventDefault();
    
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions( { suppressMarkers: true, suppressInfoWindows: true } );

    var request = {
    origin: address1,
    destination: address2,
    travelMode: google.maps.TravelMode.WALKING,
    unitSystem: google.maps.UnitSystem.METRIC,
    provideRouteAlternatives: true,
 
    };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            var routes = result.routes;
            var leg = routes[0].legs;
            var lenght = leg[0].distance.text;
            var duration = leg[0].duration.text;
        }
    });
});

$('#reset').on('click', function(evt){
    evt.preventDefault();
    $('#point1').val('');
    $('#point2').val('');

    address1 = undefined;
    address2 = undefined;

    initMap();


    });
});