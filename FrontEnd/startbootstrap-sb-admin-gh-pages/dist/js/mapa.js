/*//Função para o Mapa exemplo livro
function initMap() {
    //Ponto no mapa a localizar (cidado do porto)
    const porto = new google.maps.LatLng(41.14961, -8.61099);
  
    let google;
  
    const mapProp = {
      center: porto,
      zoom: 12,
      scrollwheel: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
  
    const map = new google.maps.Map(
      document.getElementById("googleMap"),
      mapProp
    );
    const infowindow = new google.maps.InfoWindow({
      content: "é aqui a WebConference",
    });
  
    const marker = new google.maps.Marker({
      position: porto,
      map: map,
      title: "web conference",
    });
  
    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });
  }
*/
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.14961, lng: -8.61099},
    zoom: 10,
  });
}