let id_operacional = localStorage.getItem("id_operacional");
const api_url = `https://pspoperacionais.herokuapp.com/occurrences/allPart/${id_operacional}`;
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
  let tab = `<tr><th>ID Ocorrência</th> <th>Créditos</th></tr>`;

  // Loop to access all rows
  for (let r of data) {
    //if(r.team == "2"){
    tab += `<tr><td>${r.id_occurrence} </td> <td>${r.evaluation_credits}</td></tr>`;
    //}
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-participacoes").innerHTML = tab;
}

//----------------------------------------------------------------------------------------//