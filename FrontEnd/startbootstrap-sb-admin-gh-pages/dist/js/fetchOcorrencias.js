//-------Limpa o que há de irrelevante do local storage sempre que volta à pág incial-----//
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
localStorage.removeItem("id_request");

//---inicializa e guarda o vetor que será usado mais tarde----//
let materiais = [];
localStorage.setItem("materiais", JSON.stringify(materiais));

//serve para adaptar a interface ao tipo de utilizador
hideAdminStuff();

//------------------------Funçao para fazer get das ocorrencias em que o operacional está inserido e colocar numa tabela-------------------------//

let id_operacional = localStorage.getItem("id_operacional");

const api_url = `https://pspoperacionais.herokuapp.com/occurrences/allActiveTeamOccurrence/${id_operacional}`;

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
    if (localStorage.getItem("tipo") == "Lider") {
      tab += `<tr><td>${r.id_occurrence} </td> <td><a class="btn btn-link" name="irpara" onclick = "transportidOccurrence(${r.id_occurrence})"> <i class="fas fa-check"></i> </a></td></tr>`;
    } else {
      tab += `<tr><td>${r.id_occurrence} </td> <td><a class="btn btn-link" name="irpara" onclick = "transportidOccurrence(${r.id_occurrence})"> <i class="fas fa-arrow-right"></i> </a></td></tr>`;
    }
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-ocorrencias").innerHTML = tab;
}
