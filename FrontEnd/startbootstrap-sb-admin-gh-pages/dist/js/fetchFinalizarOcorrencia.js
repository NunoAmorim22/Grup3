function FinalizarOcorrencia() {
    var data = {};
    data.id_occurrence = localStorage.getItem("id_occurrence");
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/occurrences/closeOccurrence/${id_occurrence}`, {
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