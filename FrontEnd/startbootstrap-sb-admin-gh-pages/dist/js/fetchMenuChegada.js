//funcao que coloca os dados no menu de confirmacao de chegada
function refreshMenuChegada() {
  async function fetchAsync() {
    let county = document.getElementById("chegadaDistrito");
    let id_ocorrencia = localStorage.getItem("id_occurrence");
    let address = document.getElementById("chegadaRua");

    //adapta a interface ao user
    hideLeaderStuffMap();

    const renderUsers = document.getElementById("result");
    const response = await fetch(
      `https://pspoperacionais.herokuapp.com/occurrences/occurrenceData/${id_ocorrencia}`
    );
    const users = await response.json();

    if (users[0].county == "null") {
      county.setAttribute("value", "");
    } else {
      county.setAttribute("value", users[0].county);
    }
    if (users[0].address == "null") {
      address.setAttribute("value", "");
    } else {
      address.setAttribute("value", users[0].address);
    }
  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok"))
    .catch((reason) => console.log(reason.message));
}

//chama a funcao quando inicia a pag
refreshMenuChegada();
