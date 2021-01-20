

/*
//src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0vMsMey7ulsTKk89cnPd32JdOZyOb8e4&${distrito2}&${rua2}&callback=initMap&libraries=&v=weekly`;

let map;

function initMap() {
  let distrito = document.getElementById("chegadaDistrito").value;
  let distrito2 = distrito.replace(/ /g, '');
  const coordenadas = {};
  coordenadas.aveiro = new google.maps.LatLng(40.6412 , -8.65362);
  coordenadas.beja = new google.maps.LatLng(38.0156 , -7.86523);
  coordenadas.braga = new google.maps.LatLng(41.5518 , -8.4229);
  coordenadas.braganca = new google.maps.LatLng(41.8072 , -6.75919);
  coordenadas.castelobranco = new google.maps.LatLng(39.8239 , -7.49189);
  coordenadas.coimbra = new google.maps.LatLng(40.2115 , -8.4292);
  coordenadas.evora = new google.maps.LatLng(38.571 , -7.9096);
  coordenadas.faro = new google.maps.LatLng(37.0154 , -7.93511);
  coordenadas.guarda = new google.maps.LatLng(40.5371 , -7.26785);
  coordenadas.leiria = new google.maps.LatLng(39.7443 , -8.80725);
  coordenadas.lisboa = new google.maps.LatLng(38.7071 , -9.13549);
  coordenadas.portalegre = new google.maps.LatLng(39.2914 , -7.43235);
  coordenadas.porto = new google.maps.LatLng(41.15 , -8.61024);
  coordenadas.santarem = new google.maps.LatLng(39.2362 , -8.68707);
  coordenadas.setubal = new google.maps.LatLng(38.5245 , -8.89307);
  coordenadas.vianadocastelo = new google.maps.LatLng(41.6946 , -8.83016);
  coordenadas.vilareal = new google.maps.LatLng(41.2959 , -7.74635);
  coordenadas.viseu = new google.maps.LatLng(40.6575 , -7.91428);

  map = new google.maps.Map(document.getElementById("map"), {
    center: cdestrito2,
    zoom: 10,
  });  
}

/*function initMap() {

  // Ponto no mapa a localizar (cidade do Porto)
  const porto = new google.maps.LatLng(41.14961  , -8.61099)

  // Propriedades do mapa
  const mapProp = {
    center:porto, 
    zoom:12, 
    scrollwheel:false, 
    draggable:false, 
    mapTypeId:google.maps.MapTypeId.ROADMAP
  }

  // Mapa
  const map = new google.maps.Map(document.getElementById("map"),mapProp);
  
    // Janela de informação (info window)
  const infowindow = new google.maps.InfoWindow({
    content: "É aqui a ocorrência"
  })

  // Marcador
  const marker = new google.maps.Marker({
    position:porto,
    map:map,
    title:"Ocorrência"
  })

  // Listener
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  })

} */

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
  var address = "Portugal, " + document.getElementById("chegadaDistrito").value;
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
