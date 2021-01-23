function CloseOccurrence() {
  var data = {};
  data.id_occurrence = localStorage.getItem("id_occurrence");
  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST
  fetch(`http://localhost:3000/occurrences/closeOccurrence/${data.id_occurrence}`, {
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
        // Swal.fire("Suspeito Atualizado");
        console.log("Success PUT");
        console.log(response);
        for(let id of JSON.parse(localStorage.getItem("materiais"))){
          MaterialsReturn(id);
        }
        swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Ocorrência terminada com sucesso!",
          //type: "success"
        }).then(function () {
          // Redirect the user
          window.location.href = "./MenuPrincipal.html";
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

function MaterialsReturn(id_mat) {
  var data = {};
  let id_req = localStorage.getItem("id_request");
  console.log(data); //debugging para ver os dados que foram enviados
  //chamada fetch para envio dos dados para o servior via POST
  fetch(`http://localhost:3000/materials/resets/${id_req}/materials/${id_mat}`, {
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
        // Swal.fire("Suspeito Atualizado");
        console.log("Success PUT");
        console.log(response);
        /*swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Ocorrência terminada com sucesso!",
          //type: "success"
        }).then(function () {
          // Redirect the user
          window.location.href = "./MenuPrincipal.html";
          console.log('The Ok Button was clicked.');
        });*/
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