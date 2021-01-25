//---------------------funcao para fazer Post de suspeitos--------------------------------------------//
function saveSuspect() {
  var data = {};
  data.name = document.getElementById("nameSuspect").value;
  data.naturality = document.getElementById("naturalitySuspect").value;
  let id_occurrence = localStorage.getItem("id_occurrence");
  data.genre = document.getElementById("genreSuspect").value;
  data.cc_number = document.getElementById("ccSuspect").value;
  data.job = document.getElementById("jobSuspect").value;
  data.skin_color = document.getElementById("skinSuspect").value;
  data.eyes_color = document.getElementById("eyeSuspect").value;
  data.hair_color = document.getElementById("hairSuspect").value;
  data.height = document.getElementById("heightSuspect").value;
  data.body_shape = document.getElementById("bodySuspect").value;

  console.log(data); //debugging para ver os dados que foram enviados

  //chamada fetch para envio dos dados para o servior via POST
  fetch(
    `https://pspoperacionais.herokuapp.com/participations/occurrences/${id_occurrence}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    }
  )
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
        console.log("Success POST");
        console.log(response);
        swal
          .fire({
            icon: "success",
            title: "Sucesso!",
            text: "Suspeito Registado",
          })
          .then(function () {
            // Redirect the user
            window.location.href = "./DadosOcorrencia.html";
            console.log("The Ok Button was clicked.");
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
