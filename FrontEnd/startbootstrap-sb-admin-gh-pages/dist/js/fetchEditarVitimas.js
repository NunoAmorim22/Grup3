function EditVictim() {
    var data = {};
    data.id_victim = document.getElementById("idVitima").value;
    data.name = document.getElementById("nomeVitima").value;
    data.naturality = document.getElementById("naturalidadeVitima").value;
    data.genre = document.getElementById("sexoVitima").value;
    data.cc_number = document.getElementById("ccVitima").value;
    data.job = document.getElementById("profissaoVitima").value;
    data.birth_date = document.getElementById("dataVitima").value;
    data.address = document.getElementById("moradaVitima").value;
    data.phone_number = document.getElementById("contactoVitima").value;
    data.email = document.getElementById("emailVitima").value;
    data.city = document.getElementById("localidadeVitima").value;
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/participations/victims/${data.id_victim}`, {
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
         // Swal.fire("Vitima Atualizada");
          console.log("Success PUT");
          console.log(response);
          swal.fire({
            title: "Success!",
            text: "Vitima Atualizada",
            type: "success"
          }).then(function () {
            // Redirect the user
            window.location.href = "./ListaVitimas.html";
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
  //EditVictim();