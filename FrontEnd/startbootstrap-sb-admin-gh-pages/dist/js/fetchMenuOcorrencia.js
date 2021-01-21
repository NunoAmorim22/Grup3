function refreshMenuOccurrence() {
    async function fetchAsync() {
      let id_occurrence = document.getElementById("idOccurrence");
      let id_ocorrencia = localStorage.getItem("id_occurrence");
      let county = document.getElementById("countyOccurrence");
      let address = document.getElementById("streetOccurrence");

      let confirmacaoEquipa = localStorage.getItem("confirmacaoEquipa");
      let confirmacaoMaterial = localStorage.getItem("confirmacaoMateriais");

      console.log(confirmacaoEquipa)
      if(confirmacaoEquipa){
        document.getElementById("buttonEquipa").style.background="rgb(29 144 53 / 98%)";
      }
      if(confirmacaoMaterial){
        document.getElementById("buttonMaterial").style.background="rgb(29 144 53 / 98%)";
      }
      
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

      localStorage.setItem("id_team", users[0].id_team);
      
      
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshMenuOccurrence();