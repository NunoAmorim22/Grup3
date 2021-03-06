//funcao que faz get de todos os operacionais aceites e coloca na tabela para acesso do admin
const api_url = `https://pspoperacionais.herokuapp.com/operationals/all`;

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
    tab += `<tr><td>${r.id_operational} </td> <td>${r.name}</td> <td><a class="btn" onclick = "DeleteOperational(${r.id_operational})"><i class="far fa-trash-alt"></i></a></td></tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-operacionais").innerHTML = tab;
}
