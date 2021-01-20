const api_url1 = `http://localhost:3000/rankings/teams`;

// Defining async function
async function getapi1(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  console.log(data);
  if (response) {
    hideloader1();
  }
  show(data); 
}
// Calling that async function
getapi1(api_url1);
// Function to hide the loader
function hideloader1() {
  document.getElementById("loading1").style.display = "none";
}

// Function to define innerHTML for HTML table
function show(data) {
  let tab = `<tr><th>Indicativo</th> <th>Créditos</th></tr>`;

  // Loop to access all rows
  for (let r of data) {
    tab += `<tr><td>${r.team_indicative} </td> <td>${r.total_credits}</td></tr>`;
  
  }
  // Setting innerHTML as tab variable
  document.getElementById("ranking-team").innerHTML = tab;
}
