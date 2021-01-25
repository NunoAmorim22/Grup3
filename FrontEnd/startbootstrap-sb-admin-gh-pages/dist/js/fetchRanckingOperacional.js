const api_url2 = `https://pspoperacionais.herokuapp.com/rankings/operationals`;

// Defining async function
async function getapi2(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader2();
  }
  show2(data); 
}
// Calling that async function
getapi2(api_url2);
// Function to hide the loader
function hideloader2() {
  document.getElementById("loading2").style.display = "none";
}

// Function to define innerHTML for HTML table
function show2(data) {
  let tab = `<tr><th>Lugar</th><th>ID</th> <th>Créditos</th></tr>`;
  let num = 1;
  // Loop to access all rows
  for (let r of data) {
    if(num == 6){
        break;
    }
    tab += `<tr><td>${num+"º"}</td><td>${r.id_operational} </td> <td>${r.total_credits}</td></tr>`;
    num++;
  }
  // Setting innerHTML as tab variable
  document.getElementById("ranking-operational").innerHTML = tab;
}
