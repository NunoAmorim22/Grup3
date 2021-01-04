function saveWitness() {
    var data = {};
    data.name = document.getElementById("nameWitness").value;
    data.naturality = document.getElementById("naturalityWitness").value;
    let id_occurrence = localStorage.getItem("id_occurrence");
    /*let genre;
    if (document.getElementById("maleWitness").checked) {
      genre = document.getElementById("maleWitness").value;
    } else if (document.getElementById("femaleWitness").checked) {
      genre = document.getElementById("femaleWitness").value;
    }*/
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
    fetch(`http://localhost:3000/participations/occurrences/wits/${id_occurrence}`, {
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
            text: "Testemunha Registada",
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