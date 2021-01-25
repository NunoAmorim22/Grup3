//Funcao para colocar os dados na pagina editar perfil
function refreshDadosEditar() {
    async function fetchAsync() {
      let id_operational = document.getElementById("idEditar");
      let id_operacional = localStorage.getItem("id_operacional");
      let email_operational = document.getElementById("emailEditar");
      let name = document.getElementById("nomeEditar");
      let pass = document.getElementById("passwordEditar");
      let rep_pass = document.getElementById("rep_passwordEditar");

      const renderUsers = document.getElementById("result");
      const response = await fetch(`https://pspoperacionais.herokuapp.com/operationals/rest/${id_operacional}`);
      const users = await response.json();
      id_operational.setAttribute("value", users[0].id_operational);
  
  
      if (users[0].name == "null") {
        name.setAttribute("value", "");
      }
      else {
        name.setAttribute("value", users[0].name);
      }
      if (users[0].email == "null") {
        email_operational.setAttribute("value", "");
      }
      else {
        email_operational.setAttribute("value", users[0].email);
      }
      if (users[0].password == "null") {
        pass.setAttribute("value", "");
      }
      else {
        pass.setAttribute("value", users[0].password);
        console.log(users[0].password);
      }
      if (users[0].password == "null") {
        rep_pass.setAttribute("value", "");
      }
      else {
        rep_pass.setAttribute("value", users[0].password);
      }
  
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  //chama a funcao quando inicia a pag
  refreshDadosEditar();