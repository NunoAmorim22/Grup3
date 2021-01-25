function refreshWitness() {
    async function fetchAsync() {
      let id_participant = document.getElementById("idTestemunha");
      let id = localStorage.getItem("id_witness");
      let id_occurrence = localStorage.getItem("id_occurrence");
      let name = document.getElementById("nomeTestemunha");
      let naturality = document.getElementById("naturalidadeTestemunha");
      let genre = document.getElementById("sexoTestemunha");
      let cc_number = document.getElementById("ccTestemunha");
      let job = document.getElementById("profissaoTestemunha");
      let birth_date = document.getElementById("dataTestemunha");
      let address = document.getElementById("moradaTestemunha");
      let phone_number = document.getElementById("contactoTestemunha");
      let email = document.getElementById("emailTestemunha");
      let city = document.getElementById("localidadeTestemunha");
  
      const renderUsers = document.getElementById("result");
      const response = await fetch(`https://pspoperacionais.herokuapp.com/participations/participantsocurrences/occurrences/${id_occurrence}/participants/${id}/type/Testemunha`);
      const users = await response.json();
  
      id_participant.setAttribute("value", users[0].id_participant);
  
  
      if (users[0].name == "null") {
        name.setAttribute("value", "");
      }
      else {
        name.setAttribute("value", users[0].name);
      }
      if (users[0].naturality == "null") {
        naturality.setAttribute("value", "");
      }
      else {
        naturality.setAttribute("value", users[0].naturality);
      }
      if (users[0].genre == "null") {
        genre.setAttribute("value", "");
      }
      else {
        genre.value = users[0].genre;
      }
      if (users[0].cc_number == "null") {
        cc_number.setAttribute("value", "");
      }
      else {
        cc_number.setAttribute("value", users[0].cc_number);
      }
      if (users[0].job == "null") {
        job.setAttribute("value", "");
      }
      else {
        job.setAttribute("value", users[0].job);
      }
      if (users[0].birth_date == "null") {
        birth_date.setAttribute("value", "");
      }
      else {
        birth_date.setAttribute("value", users[0].birth_date);
      }
      if (users[0].phone_number == "null") {
        phone_number.setAttribute("value", "");
      }
      else {
        phone_number.setAttribute("value", users[0].phone_number);
      }
      if (users[0].address == "null") {
        address.setAttribute("value", "");
      }
      else {
        address.setAttribute("value", users[0].address);
      }
      if (users[0].email == "null") {
        email.setAttribute("value", "");
      }
      else {
        email.setAttribute("value", users[0].email);
      }
      if (users[0].city == "null") {
        city.setAttribute("value", "");
      }
      else {
        city.setAttribute("value", users[0].city);
      }
  
  
      console.log(users[0].id_suspect);
      console.log(users[0].name);
  
    }
    //chama a função fetchAsync()
    fetchAsync()
      .then((data) => console.log("ok"))
      .catch((reason) => console.log(reason.message));
  }
  
  refreshWitness();