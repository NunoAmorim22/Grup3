function Login() {
    var data = {};
    data.email = document.getElementById("emailLogin").value;
    data.password = document.getElementById("passwordLogin").value;

    if(data.email == "" || data.password == ""){
      document.getElementById("labelErro").style.display = "block";
      return false;
    }
    
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/signin`, {
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
          // Swal.fire("Suspeito Atualizado");
          console.log("Success POST");
          console.log(response);
            window.location.href = "./MenuPrincipal.html";
           
        }
      })
      .then(function (result) {
        console.log(result);
        swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Credenciais erradas!",
          //type: "success"
      }).then(function () {
          // Redirect the user
          //window.location.href = "./DadosOcorrencia.html";
          console.log('The Ok Button was clicked.');
      });
      })
      .catch(function (err) {
        swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Erro de submissão",
          //type: "success"
      }).then(function () {
          // Redirect the user
          //window.location.href = "./DadosOcorrencia.html";
          console.log('The Ok Button was clicked.');
      });
        console.error(err);
      });
  }