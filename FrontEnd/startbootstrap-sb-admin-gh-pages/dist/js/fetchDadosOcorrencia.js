function refreshSuspect() {
    async function fetchAsync() {
      let id_occurrence = document.getElementById("idOcorrencia");
      let id_ocorrencia = localStorage.getItem("id_occurrence");
      let local = document.getElementById("localOcorrencia");
      let data = document.getElementById("dataOcorrencia");
      let equipa = document.getElementById("equipaOcorrencia");
      
  
      const renderUsers = document.getElementById("result");
      const response = await fetch(`http://localhost:3000/participations/occurrences/${id_ocorrencia}`);
      const users = await response.json();
  
      id_occurrence.setAttribute("value", users[0].id_occurrence);
  
  
      if (users[0].local == "null") {
        local.setAttribute("value", "");
      }
      else {
        local.setAttribute("value", users[0].local);
      }
      if (users[0].data == "null") {
        data.setAttribute("value", "");
      }
      else {
        data.setAttribute("value", users[0].data);
      }
      if (users[0].equipa == "null") {
        equipa.setAttribute("value", "");
      }
      else {
        equipa.setAttribute("value", users[0].equipa);
      }
      
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshSuspect();