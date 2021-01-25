//Função para fazer post de testemunhas
function saveWitness() {
  var data = {};
  data.name = document.getElementById("nameWitness").value;
  data.naturality = document.getElementById("naturalityWitness").value;
  let id_occurrence = localStorage.getItem("id_occurrence");
  data.genre = document.getElementById("genreWitness").value;
  data.cc_number = document.getElementById("ccWitness").value;
  data.job = document.getElementById("jobWitness").value;
  data.birth_date = document.getElementById("dateWitness").value;
  data.address = document.getElementById("addressWitness").value;
  data.phone_number = document.getElementById("phoneWitness").value;
  data.email = document.getElementById("emailWitness").value;
  data.city = document.getElementById("localityWitness").value;

  console.log(data); //debugging para ver os dados que foram enviados

  //chamada fetch para envio dos dados para o servior via POST
  fetch(
    `https://pspoperacionais.herokuapp.com/participations/occurrences/wits/${id_occurrence}`,
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
            text: "Testemunha Registada",
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
