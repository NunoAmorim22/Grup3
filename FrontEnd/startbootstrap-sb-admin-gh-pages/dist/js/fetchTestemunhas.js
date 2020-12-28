//------------------------Funçao para fazer get das testemunhas e colocar numa tabela-------------------------//
const api_url = "http://localhost:3000/participations/allparticipants/occurrence/1/type/Testemunha";

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
  let tab = `<tr><th>Nome</th> <th>Id Testemunha</th></tr>`;

  // Loop to access all rows
  for (let r of data) {
    if(r.active === 1){
    tab += `<tr><td>${r.name} </td> <td>${r.id_witness}</td><td><a class="btn" onclick = "transportidTestemunha(${r.id_witness})"><i class="fas fa-folder-plus"></i></a></td></tr>`;
    }
  }
  // Setting innerHTML as tab variable
  document.getElementById("lista-testemunhas").innerHTML = tab;
}