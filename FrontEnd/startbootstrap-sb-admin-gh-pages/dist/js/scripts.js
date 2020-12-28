/*!
 * Start Bootstrap - SB Admin v6.0.2 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */

//Função para Navbar
(function ($) {
  "use strict";

  // Add active state to sidbar nav links
  var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
  $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {
    if (this.href === path) {
      $(this).addClass("active");
    }
  });

  // Toggle the side navigation
  $("#sidebarToggle").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("sb-sidenav-toggled");
  });
})(jQuery);

//Função para o Mapa exemplo livro
function myMap() {
  //Ponto no mapa a localizar (cidado do porto)
  const porto = new google.maps.LatLng(41.14961, -8.61099);

  let google;

  const mapProp = {
    center: porto,
    zoom: 12,
    scrollwheel: false,
    draggable: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  const map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapProp
  );
  const infowindow = new google.maps.InfoWindow({
    content: "é aqui a WebConference",
  });

  const marker = new google.maps.Marker({
    position: porto,
    map: map,
    title: "web conference",
  });

  marker.addListener("click", function () {
    infowindow.open(map, marker);
  });
}

function login() {
  /*TEmporario para teste*/

  const email = "daniela@gmail.com";
  const password = "12345";
  let mail = document.getElementById("inputEmailAddress").value;
  let pass = document.getElementById("inputPassword").value;
  console.log("as");
  if ((mail === email) & (pass === password)) {
    console.log("as");
    document.location.href = "./MenuPrincipal.html";
  } else {
    alert("credencias erradas");
  }
}

function evaluationAssign() {
  let ev1;
  let ev2;
  let ev3;
  let ev4;

  let form1 = document.getElementById("member1");
  let form2 = document.getElementById("member2");
  let form3 = document.getElementById("member3");
  let form4 = document.getElementById("member4");

  for (let i = 1; i < form1.length; i++) {
    let c = form1.getElementsByTagName("input")[i];
    if (c.checked) {
      ev1 = c.value;
    }
  }
  for (let i = 1; i < form2.length; i++) {
    let c = form2.getElementsByTagName("input")[i];
    if (c.checked) {
      ev2 = c.value;
    }
  }
  for (let i = 1; i < form3.length; i++) {
    let c = form3.getElementsByTagName("input")[i];
    if (c.checked) {
      ev3 = c.value;
    }
  }
  for (let i = 1; i < form4.length; i++) {
    let c = form4.getElementsByTagName("input")[i];
    if (c.checked) {
      ev4 = c.value;
    }
  }
  if (ev1 != null && ev2 != null && ev3 != null && ev4 != null) {
    alert(
      "Avaliçao primeiro membro: " +
        ev1 +
        "\nAvaliçao segundo membro: " +
        ev2 +
        "\nAvaliçao terceiro membro: " +
        ev3 +
        "\nAvaliçao quarto membro: " +
        ev4
    );
    document.location.href = "./DadosOcorrencia.html";
  } else {
    alert("Preencha todos os campos!");
  }
}

function victimRegister() {
  let name = document.getElementById("name").value;
  let naturality = document.getElementById("natural").value;
  let birthdate = document.getElementById("date").value;
  let gender;
  let cc = document.getElementById("cc").value;
  let contact = document.getElementById("phone").value;
  let job = document.getElementById("job").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;
  let locality = document.getElementById("local").value;

  if (document.getElementById("male").checked) {
    gender = document.getElementById("male").value;
  } else if (document.getElementById("female").checked) {
    gender = document.getElementById("female").value;
  }

  if (
    name != null &&
    naturality != null &&
    birthdate != "" &&
    email != "" &&
    gender != null &&
    cc != "" &&
    contact != null &&
    job != null &&
    address != "" &&
    locality != ""
  ) {
    confirm(
      "Tem a certeza que deseja gravar os dados? \nNome: " +
        name +
        "\nNaturalidade: " +
        naturality +
        "\nData de nascimento: " +
        birthdate +
        "\nSexo: " +
        gender +
        "\nCartão de Cidadão: " +
        cc +
        "\nContacto: " +
        contact +
        "\nProfissão: " +
        job +
        "\nE-mail: " +
        email +
        "\nMorada: " +
        address +
        "\nLocalidade: " +
        locality
    );
    //document.location.href = './DadosOcorrencia.html';
  }
}

function witnessRegister() {
  let name = document.getElementById("nameWitness").value;
  let naturality = document.getElementById("naturalityWitness").value;
  let birthdate = document.getElementById("dateWitness").value;
  let gender;
  let cc = document.getElementById("ccWitness").value;
  let contact = document.getElementById("phoneWitness").value;
  let job = document.getElementById("jobWitness").value;
  let email = document.getElementById("emailWitness").value;
  let address = document.getElementById("addressWitness").value;
  let locality = document.getElementById("localityWitness").value;

  if (document.getElementById("maleWitness").checked) {
    gender = document.getElementById("maleWitness").value;
  } else if (document.getElementById("femaleWitness").checked) {
    gender = document.getElementById("femaleWitness").value;
  }
}

function suspectRegister() {
  let name = document.getElementById("nameSuspect").value;
  let naturality = document.getElementById("naturalitySuspect").value;
  let gender;
  let cc = document.getElementById("ccSuspect").value;
  let job = document.getElementById("jobSuspect").value;
  let skin = document.getElementById("skinSuspect").value;
  let eye = document.getElementById("eyeSuspect").value;
  let hair = document.getElementById("hairSuspect").value;
  let height = document.getElementById("heightSuspect").value;
  let body = document.getElementById("bodySuspect").value;

  if (document.getElementById("maleSuspect").checked) {
    gender = document.getElementById("maleSuspect").value;
  } else if (document.getElementById("femaleSuspect").checked) {
    gender = document.getElementById("femaleSuspect").value;
  }

  if (gender != null) {
    if (
      confirm(
        "Tem a certeza que deseja gravar os dados? \nNome: " +
          name +
          "\nNaturalidade: " +
          naturality +
          "\nData de nascimento: " +
          birthdate +
          "\nSexo: " +
          gender +
          "\nCartão de Cidadão: " +
          cc +
          "\nContacto: " +
          contact +
          "\nProfissão: " +
          job +
          "\nE-mail: " +
          email +
          "\nMorada: " +
          address +
          "\nLocalidade: " +
          locality
      )
    ) {
      alert("Suspeito registado.");
      document.location.href = "./DadosOcorrencia.html";
    } else {
      alert("Ação cancelada.");
    }
  }
}

function profileValidator() {
  let name = editarPerfil.name.value;
  let password = editarPerfil.password.value;
  let rep_password = editarPerfil.rep_password.value;

  if (name == "") {
    alert("Preecha o campo com o seu nome!");
    editarPerfil.name.focus();
    return false;
  }
  if (name.length < 5) {
    alert("insira o seu nome completo!");
    editarPerfil.name.focus();
    return false;
  }
  if (password == "") {
    alert("Preecha o campo com a password!");
    editarPerfil.password.focus();
    return false;
  }
  if (rep_password == "") {
    alert("Preecha o campo da confirmação de password!");
    editarPerfil.rep_password.focus();
    return false;
  }
  if (password != rep_password) {
    alert("senhas diferentes");
    editarPerfil.password.focus();
    return false;
  } else {
    document.location.href = "./Perfil.html";
  }
}

function confirmPresence() {
  if (confirm("Tem a certeza que deseja confirmar presença?")) {
    alert("A confirmação de presença foi efetuada!");
    document.location.href = "./MenuPrincipal.html";
    ////////////////////////////MANDAR CONFIRMAÇAO DE PRESENÇA PARA BASE DE DADOS////////////////////////////////
  } else {
    alert(
      "Cancelou o pedido de confirmação de presença.\nVai ser reencaminhado para a página principal."
    );
    document.location.href = "./MenuPrincipal.html";
  }
}

function arrivalConfirmation() {
  if (confirm("Tem a certeza que deseja confirmar a chegada ao local?")) {
    alert("A confirmação de chegada ao local foi efetuada!");
    document.location.href = "./DadosOcorrencia.html";
    ////////////////////////////MANDAR CONFIRMAÇAO DE CHEGADA PARA BASE DE DADOS//////////////////////////////
  } else {
    alert(
      "Cancelou o pedido de confirmação de chegada.\nVai ser reencaminhado para o menu de ocorrência."
    );
    document.location.href = "./MenuOcorrencia.html";
  }
}

function departureConfirmation() {
  //////////////TEMOS DE VERIFICAR SE AS OUTRAS CONFIRMAÇOES ESTAO FEITAS//////////////////////////////
  let confirmacaoEquipa = true;
  let confirmacaoMateriais = true;

  if (confirmacaoMateriais == true && confirmacaoEquipa == true) {
    /////vai para o mapa, entretanto vai para a confirmaçao de chegada. Deve mudar isto bem como a mensagem de alert/////
    alert(
      "Confirmação de partida executada, vai ser reencaminhado para a pagina de confirmação de chegada."
    );
    document.location.href = "./ConfirmarChegada.html";
  } else {
    alert("Deve confirmar a equipa e o material antes de prosseguir!");
  }
}

function occurrenceEnding() {
  let avaliaçoesFeitas = false;
  if (avaliaçoesFeitas) {
    alert("A finalizar ocorrência.");
    document.location.href = "./MenuPrincipal.html";
  } else {
    alert("Deve avaliar os intervenientes antes de finalizar a ocorrência!");
    document.location.href = "./Avaliacoes.html";
  }
}

function cantGo() {
  alert("Neste momento não lhe é permitido aceder a esta página.");
}

function enableEditionSuspect() {
  document.getElementById("guardarSuspeito").style.display = "block";

  document.getElementById("nomeSuspeito").readOnly = false;
  document.getElementById("naturalidadeSuspeito").readOnly = false;
  document.getElementById("sexoSuspeito").readOnly = false;
  document.getElementById("ccSuspeito").readOnly = false;
  document.getElementById("profissaoSuspeito").readOnly = false;
  document.getElementById("peleSuspeito").readOnly = false;
  document.getElementById("olhosSuspeito").readOnly = false;
  document.getElementById("cabeloSuspeito").readOnly = false;
  document.getElementById("alturaSuspeito").readOnly = false;
  document.getElementById("corpoSuspeito").readOnly = false;
}

function saveSuspect() {
  let id = document.getElementById("idSuspeito").value;
  let name = document.getElementById("nomeSuspeito").value;
  let naturality = document.getElementById("naturalidadeSuspeito").value;
  let gender = document.getElementById("sexoSuspeito").value;
  let cc = document.getElementById("ccSuspeito").value;
  let job = document.getElementById("profissaoSuspeito").value;
  let skin = document.getElementById("peleSuspeito").value;
  let eye = document.getElementById("olhosSuspeito").value;
  let hair = document.getElementById("cabeloSuspeito").value;
  let height = document.getElementById("alturaSuspeito").value;
  let body = document.getElementById("corpoSuspeito").value;

  if (confirm("Deseja guardar os dados?")) {
    alert("Dados modificados!");
    ////////////////////GUARDAR DADOS NA BD//////////////////////////////
    document.location.href = "";
  } else {
    document.location.href = "";
  }
}

function erraseSuspect() {
  let id = document.getElementById("idSuspeito").value;
  if (confirm("Tem a certeza que deseja apagar o suspeito " + id + "?")) {
    alert("Suspeito " + id + " apagado!");
    ////////////////////APAGAR NA BASE DE DADOS//////////////////////////////
    document.location.href = "./ListaSuspeitos.html";
  } else {
    document.location.href = "";
  }
}

function enableEditionWitness() {
  document.getElementById("guardarTestemunha").style.display = "block";

  document.getElementById("nomeTestemunha").readOnly = false;
  document.getElementById("sexoTestemunha").readOnly = false;
  document.getElementById("naturalidadeTestemunha").readOnly = false;
  document.getElementById("ccTestemunha").readOnly = false;
  document.getElementById("dataTestemunha").readOnly = false;
  document.getElementById("contactoTestemunha").readOnly = false;
  document.getElementById("profissaoTestemunha").readOnly = false;
  document.getElementById("emailTestemunha").readOnly = false;
  document.getElementById("moradaTestemunha").readOnly = false;
  document.getElementById("localidadeTestemunha").readOnly = false;
}

function saveWitness() {
  let id = document.getElementById("idTestemunha").value;
  let name = document.getElementById("nomeTestemunha").value;
  let gender = document.getElementById("sexoTestemunha").value;
  let naturality = document.getElementById("naturalidadeTestemunha").value;
  let cc = document.getElementById("ccTestemunha").value;
  let birthdate = document.getElementById("dataTestemunha").value;
  let contact = document.getElementById("contactoTestemunha").value;
  let job = document.getElementById("profissaoTestemunha").value;
  let email = document.getElementById("emailTestemunha").value;
  let address = document.getElementById("moradaTestemunha").value;
  let locality = document.getElementById("localidadeTestemunha").value;

  if (confirm("Deseja guardar os dados?")) {
    alert("Dados modificados!");
    ////////////////////GUARDAR DADOS NA BD//////////////////////////////
    document.location.href = "";
  }
}

function erraseWitness() {
  let id = document.getElementById("idTestemunha").value;
  if (confirm("Tem a certeza que deseja apagar a testemunha " + id + "?")) {
    alert("Testemunha " + id + " apagada!");
    ////////////////////APAGAR NA BASE DE DADOS//////////////////////////////
    document.location.href = "./ListaTestemunhas.html";
  } else {
    document.location.href = "";
  }
}

function enableEditionVictim() {
  document.getElementById("guardarVitima").style.display = "block";

  document.getElementById("nomeVitima").readOnly = false;
  document.getElementById("sexoVitima").readOnly = false;
  document.getElementById("naturalidadeVitima").readOnly = false;
  document.getElementById("ccVitima").readOnly = false;
  document.getElementById("dataVitima").readOnly = false;
  document.getElementById("contactoVitima").readOnly = false;
  document.getElementById("profissaoVitima").readOnly = false;
  document.getElementById("emailVitima").readOnly = false;
  document.getElementById("moradaVitima").readOnly = false;
  document.getElementById("localidadeVitima").readOnly = false;
}

function saveVictim() {
  let id = document.getElementById("idVitima").value;
  let name = document.getElementById("nomeVitima").value;
  let gender = document.getElementById("sexoVitima").value;
  let naturality = document.getElementById("naturalidadeVitima").value;
  let cc = document.getElementById("ccVitima").value;
  let birthdate = document.getElementById("dataVitima").value;
  let contact = document.getElementById("contactoVitima").value;
  let job = document.getElementById("profissaoVitima").value;
  let email = document.getElementById("emailVitima").value;
  let address = document.getElementById("moradaVitima").value;
  let locality = document.getElementById("localidadeVitima").value;

  if (confirm("Deseja guardar os dados?")) {
    alert("Dados modificados!");
    ////////////////////GUARDAR DADOS NA BD//////////////////////////////
    document.location.href = "";
  }
}

function erraseVictim() {
  let id = document.getElementById("idVitima").value;
  if (confirm("Tem a certeza que deseja apagar a vitima " + id + "?")) {
    alert("Vitima " + id + " apagada!");
    ////////////////////APAGAR NA BASE DE DADOS//////////////////////////////
    document.location.href = "./ListaVitimas.html";
  } else {
    document.location.href = "";
  }
}

function transportid(idtotransport){
  localStorage.setItem("id_suspect", idtotransport); 
  document.location.href = "./DadosSuspeitos.html";
}

function transportidTestemunha(idtotransport){
  localStorage.setItem("id_witness", idtotransport); 
  document.location.href = "./DadosTestemunha.html";
}