function refreshDadosEditar() {
    async function fetchAsync() {
      let id_operational = document.getElementById("idEditar");
      localStorage.setItem("id_operacional", "7");
      let id_operacional = localStorage.getItem("id_operacional");
      let email_operational = document.getElementById("emailEditar");
      let name = document.getElementById("nomeEditar");
  
      const renderUsers = document.getElementById("result");
      const response = await fetch(`http://localhost:3000/operationals/rest/${id_operacional}`);
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
        email_operational.value = users[0].email;
      }
  
  
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshDadosEditar();