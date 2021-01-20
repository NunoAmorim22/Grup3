/*let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.14961, lng: -8.61099},
    zoom: 10,
  });  
}
*/
function initMap() {

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

} 