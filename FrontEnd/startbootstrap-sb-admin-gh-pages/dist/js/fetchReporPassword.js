//Funcao para repor a pass quando esta é esquecida e não consegue fazer login
function ReporPassword() {
  var data = {};
  data.email = localStorage.getItem("Email");
  let palavraPass = document.getElementById("forgotPassword").value;
  let rep_password = document.getElementById("forgotRepPass").value;
  if (palavraPass === "" || rep_password === "") {
    swal
      .fire({
        icon: "warning",
        title: "Alerta!",
        text: "Preencha todos os campos!",
      })
      .then(function () {
        console.log("The Ok Button was clicked.");
      });
    document.getElementById("inputPassword").focus();
    return false;
  } else if (palavraPass != rep_password) {
    swal
      .fire({
        icon: "warning",
        title: "Alerta!",
        text: "Senhas diferentes!",
      })
      .then(function () {
        console.log("The Ok Button was clicked.");
      });
    document.getElementById("inputPassword").focus();
    return false;
  } else {
    data.password = palavraPass;
  }

  console.log(data);

  fetch(`https://pspoperacionais.herokuapp.com/operationals/changepwds`, {
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
        console.log("Success PUT");
        console.log(response);
        swal
          .fire({
            icon: "success",
            title: "Sucesso!",
            text: "Palavra-passe atualizada!",
          })
          .then(function () {
            // Redirect the user
            window.location.href = "./login.html";
            console.log("The Ok Button was clicked.");
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
