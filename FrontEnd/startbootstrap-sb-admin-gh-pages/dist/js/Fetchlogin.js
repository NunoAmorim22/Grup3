function Login() {
  var data = {};
  data.email = document.getElementById("emailLogin").value;
  data.password = document.getElementById("passwordLogin").value;



  if (data.email == "" || data.password == "") {
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
      } else {
        // Swal.fire("Suspeito Atualizado");
        console.log("Success POST");
        console.log(response);
      }
    })
    .then(function (result) {
      console.log(result);
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


function ToFetchLoginData() {
  async function fetchAsync() {
    var data1 = {};
    data1.email = document.getElementById("emailLogin").value;
    console.log("TA A VIR AQUI");

    const renderUsers = document.getElementById("result");
    const response = await fetch(`http://localhost:3000/operationals/infoLogins`);
    const users = await response.json();


    localStorage.setItem("id_operacional", users[0].id_operational);
    localStorage.setItem("tipo", users[0].login_type);


    console.log(users[0].id_suspect);
    console.log(users[0].name);

  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok")/*, window.location.href = "./MenuPrincipal.html"*/)
    .catch((reason) => console.log(reason.message));
}