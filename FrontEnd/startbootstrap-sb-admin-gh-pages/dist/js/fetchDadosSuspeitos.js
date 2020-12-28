function refreshSuspect() {
  async function fetchAsync() {
    let id_suspect = document.getElementById("idSuspeito");
    let id = localStorage.getItem("id_suspect");
    let name = document.getElementById("nomeSuspeito");
    let naturality = document.getElementById("naturalidadeSuspeito");
    let genre = document.getElementById("sexoSuspeito");
    let cc_number = document.getElementById("ccSuspeito");
    let job = document.getElementById("profissaoSuspeito");
    let skin_color = document.getElementById("peleSuspeito");
    let eyes_color = document.getElementById("olhosSuspeito");
    let hair_color = document.getElementById("cabeloSuspeito");
    let height = document.getElementById("alturaSuspeito");
    let body_shape = document.getElementById("corpoSuspeito");

    const renderUsers = document.getElementById("result");
    const response = await fetch(`http://localhost:3000/Suspects/${id}`);
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
