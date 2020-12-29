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
    const response = await fetch(`http://localhost:3000/participations/suspectsoccurrences/occurrences/1/suspects/${id}`);
    const users = await response.json();

    id_suspect.setAttribute("value", users[0].id_suspect);


    if (users[0].name == "null") {
      name.setAttribute("value", "");
    }
    else {
      name.setAttribute("value", users[0].name);
    }
    if (users[0].naturality == "null") {
      naturality.setAttribute("value", "");
    }
    else {
      naturality.setAttribute("value", users[0].naturality);
    }
    if (users[0].genre == "null") {
      genre.setAttribute("value", "");
    }
    else {
      genre.setAttribute("value", users[0].genre);
    }
    if (users[0].cc_number == "null") {
      cc_number.setAttribute("value", "");
    }
    else {
      cc_number.setAttribute("value", users[0].cc_number);
    }
    if (users[0].job == "null") {
      job.setAttribute("value", "");
    }
    else {
      job.setAttribute("value", users[0].job);
    }
    if (users[0].skin_color == "null") {
      skin_color.setAttribute("value", "");
    }
    else {
      skin_color.setAttribute("value", users[0].skin_color);
    }
    if (users[0].eyes_color == "null") {
      eyes_color.setAttribute("value", "");
    }
    else {
      eyes_color.setAttribute("value", users[0].eyes_color);
    }
    if (users[0].hair_color == "null") {
      hair_color.setAttribute("value", "");
    }
    else {
      hair_color.setAttribute("value", users[0].hair_color);
    }
    if (users[0].height == "null") {
      height.setAttribute("value", "");
    }
    else {
      height.setAttribute("value", users[0].height);
    }
    if (users[0].body_shape == "null") {
      body_shape.setAttribute("value", "");
    }
    else {
      body_shape.setAttribute("value", users[0].body_shape);
    }


    console.log(users[0].id_suspect);
    console.log(users[0].name);

  }
  //chama a função fetchAsync()
  fetchAsync()
    .then((data) => console.log("ok"))
    .catch((reason) => console.log(reason.message));
}

refreshSuspect();
