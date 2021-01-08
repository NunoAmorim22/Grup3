function EditProfile() {
  var data = {};
  let id_operational = document.getElementById("idEditar").value;
  data.email = document.getElementById("emailEditar").value;
  data.name = document.getElementById("nomeEditar").value;
  let palavraPass = document.getElementById("passwordEditar").value;
  let rep_password = document.getElementById("rep_passwordEditar").value;
  if ( palavraPass === "" || rep_password === "") {
    if(palavraPass != rep_password){
      alert("senhas diferentes");
        editarPerfil.password.focus();
      return false;
    }else{
      alert("Preencha o campo PalavraPass");
        editarPerfil.password.focus();
      return false;
    }
  }else {
      data.password = palavraPass;
    }
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