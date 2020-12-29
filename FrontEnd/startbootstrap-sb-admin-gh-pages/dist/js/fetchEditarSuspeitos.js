function EditSuspect() {
  var data = {};
  data.id_suspect = document.getElementById("idSuspeito").value;
  data.name = document.getElementById("nomeSuspeito").value;
  data.naturality = document.getElementById("naturalidadeSuspeito").value;
  data.genre = document.getElementById("sexoSuspeito").value;
  data.cc_number = document.getElementById("ccSuspeito").value;
  data.job = document.getElementById("profissaoSuspeito").value;
  data.skin_color = document.getElementById("peleSuspeito").value;
  data.eyes_color = document.getElementById("olhosSuspeito").value;
  data.hair_color = document.getElementById("cabeloSuspeito").value;
  data.height = document.getElementById("alturaSuspeito").value;
  data.body_shape = document.getElementById("corpoSuspeito").value;
  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST
  fetch(`http://localhost:3000/participations/postsuspects/${data.id_suspect}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
        Swal.fire("Suspeito Atualizado");
        console.log("Success PUT");
        console.log(response);
      }
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      alert("Submission error");
      console.error(err);
    });
}
EditSuspect();
