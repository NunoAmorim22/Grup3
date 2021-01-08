function EditEvaluations() {
    var data = {};
    data.total_credits = document.getElementById("idSuspeito").value;
    data.grade = document.getElementById("nomeSuspeito").value;

    var data1 = {};
    data.total_credits = document.getElementById("idSuspeito").value;
    data.grade = document.getElementById("nomeSuspeito").value;

    var data2 = {};
    data.total_credits = document.getElementById("idSuspeito").value;
    data.grade = document.getElementById("nomeSuspeito").value;

    var data3 = {};
    data.total_credits = document.getElementById("idSuspeito").value;
    data.grade = document.getElementById("nomeSuspeito").value;


    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/evaluations//${data.id_suspect}`, {
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
            icon:"success",
            title: "Sucesso!",
            text: "Suspeito Atualizado",
            //type: "success"
          }).then(function () {
            // Redirect the user
            window.location.href = "./ListaSuspeitos.html";
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