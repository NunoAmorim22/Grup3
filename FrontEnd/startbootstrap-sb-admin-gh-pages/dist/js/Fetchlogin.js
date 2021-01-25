function Login() {
  var data = {};
  data.email = document.getElementById("emailLogin").value;
  data.password = document.getElementById("passwordLogin").value;

  if (data.email == "" || data.password == "") {
    document.getElementById("labelErro").style.display = "block";
    return false;
  }

  console.log(data);
  fetch(`https://pspoperacionais.herokuapp.com/signin`, {
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
        }).then(function () {
          console.log('The Ok Button was clicked.');
        });
      } else {
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
      }).then(function () {
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

  console.log(data);
  fetch(`https://pspoperacionais.herokuapp.com/signin`, {
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
        }).then(function () {
          console.log('The Ok Button was clicked.');
        });
      } else {
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
      }).then(function () {
        console.log('The Ok Button was clicked.');
      });
      console.error(err);
    });
}

function ToFetchLoginData() {

  async function fetchAsync() {
    var data1 = {};
    data1.email = document.getElementById("emailLogin").value;

    const renderUsers = document.getElementById("result");
    const response = await fetch(`https://pspoperacionais.herokuapp.com/operationals/infoLogins`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data1),
    });
    const users = await response.json();
    localStorage.setItem("tipo", users[0].login_type);
    localStorage.setItem("id_operacional", users[0].id_operational);

    window.location.href = "./MenuPrincipal.html";
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

    const renderUsers = document.getElementById("result");
    const response = await fetch(`https://pspoperacionais.herokuapp.com/operationals/infologinsadmin`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data1),
    });
    const users = await response.json();
    localStorage.setItem("tipo", users[0].tipo);

    window.location.href = "./MenuPrincipal.html";
  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok"))
    .catch((reason) => console.log(reason.message));
}