function saveVictim() {
    var data = {};
    //data.id_suspect = document.getElementById("idSuspect").value;
    
    data.name = document.getElementById("nameVictim").value;
    data.naturality = document.getElementById("naturalityVictim").value;
  
    let genre;
    if (document.getElementById("maleVictim").checked) {
      genre = document.getElementById("maleVictim").value;
    } else if (document.getElementById("femaleVictim").checked) {
      genre = document.getElementById("femaleVictim").value;
    }
    data.genre = genre;
    data.cc_number = document.getElementById("ccVitima").value;
    data.job = document.getElementById("profissaoVitima").value;
    data.birth_date = document.getElementById("dataVitima").value;
    data.address = document.getElementById("moradaVitima").value;
    data.phone_number = document.getElementById("contactoVitima").value;
    data.email = document.getElementById("emailVitima").value;
    data.city = document.getElementById("localidadeVitima").value;
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch("http://localhost:3000/participations/occurrences/vitima/1", {
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
            title: "Success!",
            text: "Vítimas Registado",
            type: "success"
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