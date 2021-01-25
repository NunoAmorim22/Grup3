//Função para fazer post de uma vitima
function saveVictim() {
  var data = {};
  data.name = document.getElementById("nameVictim").value;
  data.naturality = document.getElementById("naturalityVictim").value;
  let id_occurrence = localStorage.getItem("id_occurrence");
  data.genre = document.getElementById("genreVictim").value;
  data.cc_number = document.getElementById("ccVictim").value;
  data.job = document.getElementById("jobVictim").value;
  data.birth_date = document.getElementById("dateVictim").value;
  data.address = document.getElementById("addressVictim").value;
  data.phone_number = document.getElementById("phoneVictim").value;
  data.email = document.getElementById("emailVictim").value;
  data.city = document.getElementById("cityVictim").value;

  console.log(data); //debugging para ver os dados que foram enviados

  //chamada fetch para envio dos dados para o servior via POST
  fetch(
    `https://pspoperacionais.herokuapp.com/participations/occurrences/vitima/${id_occurrence}`,
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
            title: "Successo!",
            text: "Vítima Registada",
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
