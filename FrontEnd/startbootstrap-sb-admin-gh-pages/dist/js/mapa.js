///funcoes que iniciam o mapa e colocam o marcador no sitio correto conforme os dados de localizacao que a ocorrencia tem

var geocoder;
var map;

function initMap() {

  geocoder = new google.maps.Geocoder();

  var latlng = new google.maps.LatLng(0, 0);
  var mapOptions = {
    zoom: 13,
    center: latlng
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Call the codeAddress function (once) when the map is idle (ready)
  google.maps.event.addListenerOnce(map, 'idle', codeAddress);
}

function codeAddress() {

  // Define address to center map to
  var address = "Portugal, " + document.getElementById("chegadaDistrito").value + ", " + document.getElementById("chegadaRua").value;
  console.log(address);

  geocoder.geocode({
    'address': address
  }, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {

      // Center map on location
      map.setCenter(results[0].geometry.location);

      // Add marker on location
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

    } else {

      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

initMap();