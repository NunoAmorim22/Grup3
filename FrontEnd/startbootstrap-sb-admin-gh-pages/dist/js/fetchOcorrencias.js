//------------------------Funçao para fazer get dos suspeitos e colocar numa tabela-------------------------//
localStorage.removeItem("confirmacaoEquipa");
localStorage.removeItem("confirmacaoMateriais");
localStorage.removeItem("avaliacao");
localStorage.removeItem("avaliacao1");
localStorage.removeItem("avaliacao2");
localStorage.removeItem("avaliacao3");
localStorage.removeItem("avaliacao4");
localStorage.removeItem("id_avaliacao1");
localStorage.removeItem("id_avaliacao2");
localStorage.removeItem("id_avaliacao3");
localStorage.removeItem("id_avaliacao4");
localStorage.removeItem("id_team");
localStorage.removeItem("id_victim");
localStorage.removeItem("id_suspect");
localStorage.removeItem("id_witness");
localStorage.removeItem("id_occurrence");


localStorage.setItem("id_operacional", 1);
localStorage.setItem("tipo", "admin");

hideAdminStuff();

let id_operacional = localStorage.getItem("id_operacional");
const api_url = `http://localhost:3000/occurrences/allActiveTeamOccurrence/${id_operacional}`;

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data); 
}
// Calling that async function
getapi(api_url);
// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
}

// Function to define innerHTML for HTML table
function show(data) {
  let tab = `<tr><th>ID Ocorrência</th><th></th></tr>`;

  // Loop to access all rows
  for (let r of data) {
    if(localStorage.getItem("tipo") == "lider"){
    tab += `<tr><td>${r.id_occurrence} </td> <td><a class="btn btn-link" name="irpara" onclick = "transportidOccurrence(${r.id_occurrence})"> <i class="fas fa-check"></i> </a></td></tr>`;
    }
    else{
      tab += `<tr><td>${r.id_occurrence} </td> <td><a class="btn btn-link" name="irpara" onclick = "transportidOccurrence(${r.id_occurrence})"> <i class="fas fa-arrow-right"></i> </a></td></tr>`;
    }
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-ocorrencias").innerHTML = tab;
}

//----------------------------------------------------------------------------------------//
