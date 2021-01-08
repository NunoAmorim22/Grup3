function refreshDadosPerfil() {
    async function fetchAsync() {
      let id_operational = document.getElementById("idPerfil");
      let id_operacional = localStorage.getItem("id_operacional");
      let email_operational = document.getElementById("emailPerfil");
      let name = document.getElementById("nomePerfil");
      let team = document.getElementById("equipaPerfil");
      let credits = document.getElementById("creditosPerfil");
  
      const renderUsers = document.getElementById("result");
      const response = await fetch(`http://localhost:3000/operationals/rest/${id_operacional}`);
      const users = await response.json();
      const response1 = await fetch(`http://localhost:3000/operationals/getOperationalTeam/${id_operacional}`);
      const users1 = await response1.json();
      
      id_operational.setAttribute("value", users[0].id_operational);
  
  
      if (users[0].name == "null") {
        name.setAttribute("value", "");
      }
      else {
        name.setAttribute("value", users[0].name);
      }
      if (users1[0].team_indicative == "null") {
        team.setAttribute("value", "");
      }
      else {
        team.setAttribute("value", users1[0].team_indicative);
      }
      if (users[0].credits == "null") {
        credits.setAttribute("value", "");
      }
      else {
        credits.value = users[0].credits;
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
  
  refreshDadosPerfil();