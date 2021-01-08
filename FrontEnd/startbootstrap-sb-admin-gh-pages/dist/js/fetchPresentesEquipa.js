let id_operational = localStorage.getItem("id_operacional");
let id_equipa = localStorage.getItem("id_team");
const api_url = `http://localhost:3000/occurrences/allPres/${id_operational}`;
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
  let tab = `<tr><th>ID Operacional</th> <th>Nome</th></tr>`;

  // Loop to access all rows
  for (let r of data) {
    //if(r.team == "2"){
    tab += `<tr><td>${r.id_operational} </td> <td>${r.name}</td></tr>`;
    //}
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-presencas").innerHTML = tab;
  document.getElementById("id_team").setAttribute("value",id_equipa);
}

//----------------------------------------------------------------------------------------//