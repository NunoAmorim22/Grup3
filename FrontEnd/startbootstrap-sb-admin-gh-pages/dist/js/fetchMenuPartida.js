function refreshMenuPartida() {
    async function fetchAsync() {
      let id_occurrence = document.getElementById("occurrenceId");
      let id_ocorrencia = localStorage.getItem("id_occurrence");
      let id_team = document.getElementById("teamId");
      
  
      const renderUsers = document.getElementById("result");
      const response = await fetch(`http://localhost:3000/occurrences/occurrenceData/${id_ocorrencia}`);
      const users = await response.json();
  
      id_occurrence.setAttribute("value", users[0].id_occurrence);
  
  
      if (users[0].id_team == "null") {
        id_team.setAttribute("value", "");
      }
      else {
        id_team.setAttribute("value", users[0].id_team);
      }
      
      
      
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshMenuPartida();