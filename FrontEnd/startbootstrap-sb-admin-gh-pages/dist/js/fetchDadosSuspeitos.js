function refreshSuspect() {
  async function fetchAsync() {
    let id_suspect = document.getElementById("idSuspeito");
    let name = document.getElementById("nomeSuspeito");
    const renderUsers = document.getElementById("result");
    const response = await fetch("http://localhost:3000/Suspects/1");
    const users = await response.json();

    id_suspect.setAttribute("value", users[0].id_suspect);
    name.setAttribute("value", users[0].name);
    console.log(users[0].id_suspect);
    console.log(users[0].name);
  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok"))
    .catch((reason) => console.log(reason.message));
}

refreshSuspect();
