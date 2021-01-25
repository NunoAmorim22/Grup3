function refreshDadosPerfil() {
  async function fetchAsync() {
    let id_operational = document.getElementById("idPresenca");
    let id_operacional = localStorage.getItem("id_operacional");
    let name = document.getElementById("nomePresenca");

    const renderUsers = document.getElementById("result");
    const response = await fetch(
      `https://pspoperacionais.herokuapp.com/operationals/rest/${id_operacional}`
    );
    const users = await response.json();

    id_operational.setAttribute("value", users[0].id_operational);

    if (users[0].name == "null") {
      name.setAttribute("value", "");
    } else {
      name.setAttribute("value", users[0].name);
    }
  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok"))
    .catch((reason) => console.log(reason.message));
}

refreshDadosPerfil();
