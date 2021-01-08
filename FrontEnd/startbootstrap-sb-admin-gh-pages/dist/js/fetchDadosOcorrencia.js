function refreshOccurrence() {
    async function fetchAsync() {
      let id_occurrence = document.getElementById("idOcorrencia");
      let id_ocorrencia = localStorage.getItem("id_occurrence");
      let county = document.getElementById("distritoOcorrencia");
      let address = document.getElementById("ruaOcorrencia");
      let data = document.getElementById("dataOcorrencia");
      let equipa = document.getElementById("equipaOcorrencia");
      
  
      const renderUsers = document.getElementById("result");
      const response = await fetch(`http://localhost:3000/occurrences/occurrenceData/${id_ocorrencia}`);
      const users = await response.json();
  
      id_occurrence.setAttribute("value", users[0].id_occurrence);
  
  
      if (users[0].local == "null") {
        county.setAttribute("value", "");
      }
      else {
        county.setAttribute("value", users[0].county);
      }
      if (users[0].local == "null") {
        address.setAttribute("value", "");
      }
      else {
        address.setAttribute("value", users[0].address);
      }
      if (users[0].data == "null") {
        data.setAttribute("value", "");
      }
      else {
        data.setAttribute("value", users[0].arrival_time);
      }
      if (users[0].equipa == "null") {
        equipa.setAttribute("value", "");
      }
      else {
        equipa.setAttribute("value", users[0].team_indicative);
      }
      
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshOccurrence();