function EditProfile() {
  var data = {};
  let id_operational = document.getElementById("idEditar").value;
  data.email = document.getElementById("emailEditar").value;
  data.name = document.getElementById("nomeEditar").value;
  let palavraPass = document.getElementById("passwordEditar").value;
  let rep_password = document.getElementById("rep_passwordEditar").value;
  if (
    palavraPass === "" ||
    rep_password === "" ||
    data.email === "" ||
    data.name === ""
  ) {
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

  console.log(data); //debugging para ver os dados que foram enviados

  //chamada fetch para envio dos dados para o servior via PUT
  fetch(
    `https://pspoperacionais.herokuapp.com/operationals/edits/${id_operational}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(data),
    }
  )
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
            text: "Perfil Atualizado",
          })
          .then(function () {
            // Redirect the user
            window.location.href = "./Perfil.html";
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
