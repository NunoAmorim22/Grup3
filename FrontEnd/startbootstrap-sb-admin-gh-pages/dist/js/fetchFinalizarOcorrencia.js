function CloseOccurrence() {
  id_occurrence = localStorage.getItem("id_occurrence");

  //verifica se as avaliacoes ja foram feitas
  let avaliacao = localStorage.getItem("avaliacao");
  if (!avaliacao) {
    swal
      .fire({
        icon: "alert",
        title: "Alerta!",
        text: "Deve avaliar os operacionais!"
      })
      .then(function () {
        // Redirect the user
        window.location.href = "./Avaliacoes.html";
        console.log("The Ok Button was clicked.");
      });
  }

  //chamada fetch para envio dos dados para o servior via PUT
  fetch(
    `https://pspoperacionais.herokuapp.com/occurrences/closeOccurrence/${id_occurrence}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    }
  )
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
        console.log("Success PUT");
        console.log(response);
        for (let id of JSON.parse(localStorage.getItem("materiais"))) {
          MaterialsReturn(id);
        }
        swal
          .fire({
            icon: "success",
            title: "Sucesso!",
            text: "Ocorrência terminada com sucesso!",
          })
          .then(function () {
            // Redirect the user
            window.location.href = "./MenuPrincipal.html";
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

function MaterialsReturn(id_mat) {
  let id_req = localStorage.getItem("id_request");

  //chamada fetch para envio dos dados para o servior via PUT
  fetch(
    `https://pspoperacionais.herokuapp.com/materials/resets/${id_req}/materials/${id_mat}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    }
  )
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
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
