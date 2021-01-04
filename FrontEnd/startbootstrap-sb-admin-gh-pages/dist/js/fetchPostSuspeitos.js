//---------------------funcao para fazer Post--------------------------------------------//
function saveSuspect() {
  var data = {};
  //data.id_suspect = document.getElementById("idSuspect").value;
  data.name = document.getElementById("nameSuspect").value;
  data.naturality = document.getElementById("naturalitySuspect").value;
  let id_occurrence = localStorage.getItem("id_occurrence");

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
  fetch(`http://localhost:3000/participations/occurrences/${id_occurrence}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
        //Swal.fire("Suspeito Registado");
        console.log("Success POST");
        console.log(response);
        swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Suspeito Registado",
          //type: "success"
        }).then(function () {
          // Redirect the user
          window.location.href = "./DadosOcorrencia.html";
          console.log('The Ok Button was clicked.');
        });
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
