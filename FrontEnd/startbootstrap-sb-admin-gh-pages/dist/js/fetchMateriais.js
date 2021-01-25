//Funcao que coloca os materias atribuidos a ocorrencia numa tabela

let id_occurrence = localStorage.getItem("id_occurrence");
const api_url = `https://pspoperacionais.herokuapp.com/materials/allmaterials/${id_occurrence}`;

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
  let tab = `<tr><th>Tipo de material</th><th>Quantidade</th><th>Confirmação</th></tr>`;
  let btnid = 1;
  // Loop to access all rows
  for (let r of data) {
    tab += `<tr><td>${r.category}</td><td>${r.quantity}</td> <td><a class="btn" id="conf${btnid}" onclick = "MaterialsConfirmation(${r.id_material}, 'conf${btnid}')"><i class="fas fa-check"></i></a> <a class="btn" id="${btnid}" onclick = "turnRed(${btnid})"><i class="fas fa-times"></i></a></td></tr>`;
    btnid++;
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-materiais").innerHTML = tab;
}
