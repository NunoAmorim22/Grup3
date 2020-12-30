function EditWitness() {
    var data = {};
    data.id_wits = document.getElementById("idTestemunha").value;
    data.name = document.getElementById("nomeTestemunha").value;
    data.naturality = document.getElementById("naturalidadeTestemunha").value;
    data.genre = document.getElementById("sexoTestemunha").value;
    data.cc_number = document.getElementById("ccTestemunha").value;
    data.job = document.getElementById("profissaoTestemunha").value;
    data.birth_date = document.getElementById("dataTestemunha").value;
    data.address = document.getElementById("moradaTestemunha").value;
    data.phone_number = document.getElementById("contactoTestemunha").value;
    data.email = document.getElementById("emailTestemunha").value;
    data.city = document.getElementById("localidadeTestemunha").value;
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/participations/wits/${data.id_wits}`, {
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
          Swal.fire("Testemunha atualizada Atualizada");
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
  //EditWitness();