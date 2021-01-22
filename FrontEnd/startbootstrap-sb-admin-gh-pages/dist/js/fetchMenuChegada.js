function refreshMenuChegada() {
    async function fetchAsync() {
      let county = document.getElementById("chegadaDistrito");
      let id_ocorrencia = localStorage.getItem("id_occurrence");
      let address = document.getElementById("chegadaRua");
      
      hideLeaderStuffMap();
      const renderUsers = document.getElementById("result");
      const response = await fetch(`http://localhost:3000/occurrences/occurrenceData/${id_ocorrencia}`);
      const users = await response.json();
  
  
  
      if (users[0].county == "null") {
        county.setAttribute("value", "");
      }
      else {
        county.setAttribute("value", users[0].county);
      }
      if (users[0].address == "null") {
        address.setAttribute("value", "");
      }
      else {
        address.setAttribute("value", users[0].address);
      }
      
      
      
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshMenuChegada();