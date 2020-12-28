function EditSuspect() {
  var data = {};
  data.id_suspect = document.getElementById("idSuspeito").value;
  data.name = document.getElementById("nomeSuspeito").value;
  data.naturality = document.getElementById("naturalitySuspect").value;
  let genre;
  if (document.getElementById("maleSuspect").checked) {
    genre = document.getElementById("maleSuspect").value;
  } else if (document.getElementById("femaleSuspect").checked) {
    genre = document.getElementById("femaleSuspect").value;
  }
  data.genre = genre;
  data.cc_number = document.getElementById("ccSuspect").value;
  data.job = document.getElementById("jobSuspect").value;
  data.skin_color = document.getElementById("skinSuspect").value;
  data.eyes_color = document.getElementById("eyeSuspect").value;
  data.hair_color = document.getElementById("hairSuspect").value;
  data.height = document.getElementById("heightSuspect").value;
  data.body_shape = document.getElementById("bodySuspect").value;
  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST
  fetch(`http://localhost:3000/Suspects/${data.id_suspect}`, {
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
