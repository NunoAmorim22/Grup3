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
        ToFetchLoginData();
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

function LoginAdmin() {
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
        ToFetchLoginDataAdmin();
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

    //${data1.email}
    const renderUsers = document.getElementById("result");
    const response = await fetch(`http://localhost:3000/operationals/infoLogins`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data1),
    });
    const users = await response.json();
    console.log("TA A VIR AQUI");
    localStorage.setItem("tipo", users[0].login_type);
    localStorage.setItem("id_operacional", users[0].id_operational);
    console.log("Normal");

    window.location.href = "./MenuPrincipal.html"


    console.log(users[0].name);

  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok"))
    .catch((reason) => console.log(reason.message));
}

function ToFetchLoginDataAdmin() {
  async function fetchAsync() {
    var data1 = {};
    data1.email = document.getElementById("emailLogin").value;

    //${data1.email}
    const renderUsers = document.getElementById("result");
    const response = await fetch(`http://localhost:3000/operationals/infoLogins`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data1),
    });
    const users = await response.json();
    console.log("TA A VIR AQUI");
    localStorage.setItem("tipo", users[0].login_type);
    localStorage.setItem("id_operacional", users[0].id_operational);
    console.log("Admin");

    window.location.href = "./MenuPrincipal.html"


    console.log(users[0].name);

  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok"))
    .catch((reason) => console.log(reason.message));
}