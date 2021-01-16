function Login() {
    var data = {};
    data.email = document.getElementById("emailLogin").value;
    data.password = document.getElementById("passwordLogin").value;
    
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/operationals/edits/${id_operational}`, {
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
            text: "Perfil Atualizado",
            //type: "success"
          }).then(function () {
            // Redirect the user
            window.location.href = "./Perfil.html";
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