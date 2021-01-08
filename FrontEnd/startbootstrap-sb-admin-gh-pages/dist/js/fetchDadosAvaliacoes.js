function refreshDadosAvaliacoes() {
    async function fetchAsync() {
      let operational1 = document.getElementById("operacional1");
      let operational2 = document.getElementById("operacional2");
      let operational3 = document.getElementById("operacional3");
      let operational4 = document.getElementById("operacional4");
      let id_operational = localStorage.getItem("id_operacional")
      
      const renderUsers = document.getElementById("result");
      const response = await fetch(`http://localhost:3000/evaluations/showteamids/${id_operational}`);
      const users = await response.json();
  
  
      if (users[0].name == "null") {
        operational1.setAttribute("value", "");
      }
      else {
        operational1.setAttribute("value", users[0].name);
        localStorage.setItem("avaliacao1",users[0].total_credits);
        localStorage.setItem("id_avaliacao1",users[0].id_operational);

      }
      if (users[1].name == "null") {
        operational2.setAttribute("value", "");
      }
      else {
        operational2.setAttribute("value", users[1].name);
        console.log(users[1].total_credits);
      }
      if (users[2].name == "null") {
        operational3.setAttribute("value", "");
      }
      else {
        operational3.setAttribute("value", users[2].name);
        console.log(users[2].total_credits);
      }
      if (users[3].name == "null") {
        operational4.setAttribute("value", "");
      }
      else {
        operational4.setAttribute("value", users[3].name);
        console.log(users[3].total_credits);
      }
  
  
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshDadosAvaliacoes();