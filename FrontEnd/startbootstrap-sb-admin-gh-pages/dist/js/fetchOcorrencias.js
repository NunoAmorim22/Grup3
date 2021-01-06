//------------------------Funçao para fazer get dos suspeitos e colocar numa tabela-------------------------//
localStorage.setItem("id_operacional", 2);
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
  let tab = `<tr><th>ID Ocorrência</th></tr>`;

  // Loop to access all rows
  for (let r of data) {
    //if(r.active === 1){
    tab += `<tr><td>${r.id_occurrence} </td> <td><a class="btn btn-link" onclick = "transportidOccurrence(${r.id_occurrence})"> <i class="fas fa-check"></i> </a></td></tr>`;
    //}
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-ocorrencias").innerHTML = tab;
}

//----------------------------------------------------------------------------------------//
