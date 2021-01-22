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
    localStorage.setItem("avaliacao", true);
    swal.fire({
      icon: "alert",
      title: "Alerta!",
      text: "Avaliçao primeiro membro: " +
        ev1 +
        "\nAvaliçao segundo membro: " +
        ev2 +
        "\nAvaliçao terceiro membro: " +
        ev3 +
        "\nAvaliçao quarto membro: " +
        ev4,
      //type: "success"
    }).then(function () {
      // Redirect the user
      window.location.href = "./DadosOcorrencia.html";
      console.log('The Ok Button was clicked.');
    });
  } else {
    //alert("Preencha todos os campos!");
    swal.fire({
      icon: "alert",
      title: "Alerta!",
      text: "Preencha todos os campos!",
      //type: "success"
    })/*.then(function () {
      // Redirect the user
      window.location.href = "./DadosOcorrencia.html";
      console.log('The Ok Button was clicked.');
    })*/;
  }
}

function occurrenceEnding() {
  let avaliacao = localStorage.getItem("avaliacao");
  if (avaliacao) {
    swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: "Ocorrência Finalizada!",
      //type: "success"
    }).then(function () {
      // Redirect the user
      window.location.href = "./MenuPrincipal.html";
      console.log('The Ok Button was clicked.');
    });
  } else {
    swal.fire({
      icon: "alert",
      title: "Alerta!",
      text: "Deve avaliar os operacionais!",
      //type: "success"
    }).then(function () {
      // Redirect the user
      window.location.href = "./Avaliacoes.html";
      console.log('The Ok Button was clicked.');
    });
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


function arrivalConfirmation() {
  swal.fire({
    title: 'Confirmar chegada ao local?',
    //showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Confirmar`,
    //denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Confirmada a chegada ao local!",
      }).then(function () {
        // Redirect the user
        window.location.href = "./DadosOcorrencia.html";
        console.log('The Ok Button was clicked.');
      });
    }
  });
}

function materialsConfirmation() {
  localStorage.setItem("confirmacaoMateriais", true);
  swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Confirmação de material executada, vai ser reencaminhado para a pagina de menu de ocorrência.",
  }).then(function () {
    // Redirect the user
    window.location.href = "./MenuOcorrencia.html";
    console.log('The Ok Button was clicked.');
  });
}
function teamConfirmation() {
  localStorage.setItem("confirmacaoEquipa", true);
  swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Confirmação de equipa executada, vai ser reencaminhado para a página de menu de ocorrência.",
  }).then(function () {
    // Redirect the user
    window.location.href = "./MenuOcorrencia.html";
    console.log('The Ok Button was clicked.');
  });


}
function toDepartureWindow() {
  let confirmacaoEquipa = localStorage.getItem("confirmacaoEquipa");
  let confirmacaoMateriais = localStorage.getItem("confirmacaoMateriais");
  if (confirmacaoMateriais && confirmacaoEquipa) {
    window.location.href = "./ConfirmarPartida.html";

  } else {
    swal.fire({
      icon: "error",
      title: "Erro!",
      text: "É necessário confirmar a equipa e o material!",
    }).then(function () {
      // Redirect the user
      window.location.href = "./MenuOcorrencia.html";
      console.log('The Ok Button was clicked.');
    });
  }
}

function departureConfirmation() {
  swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Confirmação de partida executada, vai ser reencaminhado para a página de confirmação de chegada.",
  }).then(function () {
    // Redirect the user
    window.location.href = "./ConfirmarChegada.html";
    console.log('The Ok Button was clicked.');
  });
}


function cantGo() {
  //alert("Neste momento não lhe é permitido aceder a esta página.");
  swal.fire({
    icon: "warning",
    title: "Alerta!",
    text: "Não pode sair desta página!",
    //type: 'sucess'
  }).then(function () {
    // Redirect the user
    //window.location.href = "./DadosOcorrencia.html";
    //console.log('The Ok Button was clicked.');
  });
}

function enableEditionSuspect() {
  document.getElementById("guardarSuspeito").style.display = "block";

  document.getElementById("nomeSuspeito").readOnly = false;
  document.getElementById("naturalidadeSuspeito").readOnly = false;
  document.getElementById("sexoSuspeito").removeAttribute("disabled");
  document.getElementById("ccSuspeito").readOnly = false;
  document.getElementById("profissaoSuspeito").readOnly = false;
  document.getElementById("peleSuspeito").readOnly = false;
  document.getElementById("olhosSuspeito").readOnly = false;
  document.getElementById("cabeloSuspeito").readOnly = false;
  document.getElementById("alturaSuspeito").readOnly = false;
  document.getElementById("corpoSuspeito").readOnly = false;
}


function enableEditionWitness() {
  document.getElementById("guardarTestemunha").style.display = "block";

  document.getElementById("nomeTestemunha").readOnly = false;
  document.getElementById("sexoTestemunha").removeAttribute("disabled");//("desabled",false);
  document.getElementById("naturalidadeTestemunha").readOnly = false;
  document.getElementById("ccTestemunha").readOnly = false;
  document.getElementById("dataTestemunha").readOnly = false;
  document.getElementById("contactoTestemunha").readOnly = false;
  document.getElementById("profissaoTestemunha").readOnly = false;
  document.getElementById("emailTestemunha").readOnly = false;
  document.getElementById("moradaTestemunha").readOnly = false;
  document.getElementById("localidadeTestemunha").readOnly = false;
}


function enableEditionVictim() {
  document.getElementById("guardarVitima").style.display = "block";

  document.getElementById("nomeVitima").readOnly = false;
  document.getElementById("sexoVitima").removeAttribute("disabled");
  document.getElementById("naturalidadeVitima").readOnly = false;
  document.getElementById("ccVitima").readOnly = false;
  document.getElementById("dataVitima").readOnly = false;
  document.getElementById("contactoVitima").readOnly = false;
  document.getElementById("profissaoVitima").readOnly = false;
  document.getElementById("emailVitima").readOnly = false;
  document.getElementById("moradaVitima").readOnly = false;
  document.getElementById("localidadeVitima").readOnly = false;
}

function transportid(idtotransport) {
  localStorage.setItem("id_suspect", idtotransport);
  document.location.href = "./DadosSuspeitos.html";
}

function transportidTestemunha(idtotransport) {
  localStorage.setItem("id_witness", idtotransport);
  document.location.href = "./DadosTestemunha.html";
}

function transportidVitima(idtotransport) {
  localStorage.setItem("id_victim", idtotransport);
  document.location.href = "./DadosVitimas.html";
}

function transportidOccurrence(idtotransport) {
  if (localStorage.getItem("tipo") == "lider") {
    localStorage.setItem("id_occurrence", idtotransport);
    document.location.href = "./MenuOcorrencia.html";
  } else {
    localStorage.setItem("id_occurrence", idtotransport);
    document.location.href = "./ConfirmarChegada.html";
  }

}

function coisaLinda() {
  Swal.fire({
    title: 'Querias!',
    width: 300,
    padding: '3em',
    background: '#fff',
    backdrop: `
      url("https://media.giphy.com/media/o5HKScC1PflLO/giphy.gif")
      bottom
      no-repeat
    `
  })
}

function logout() {
  localStorage.clear();

  document.location.href = "./login.html";
}

function hideAdminStuff() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "admin") {
    //document.getElementById("adminStuff").style.display = "none";
    document.getElementById("listaOperacionais").style.display = "none";
    document.getElementById("criarContaAdmin").style.display = "none";
  }else{
    document.getElementById("tabelaparamandardebase").style.display = "none";
    document.getElementById("participacoes").style.display = "none";
    document.getElementById("equipaOcorrencia").style.display = "none";

  }
}

function AdminCantGo(){
  let tipo = localStorage.getItem("tipo");
  if(tipo == "admin"){
    swal.fire({
      icon: "warning",
      title: "Alerta!",
      text: "Não pode aceder a esta página!",
      //type: 'sucess'
    }).then(function () {
      // Redirect the user
      //window.location.href = "./DadosOcorrencia.html";
      //console.log('The Ok Button was clicked.');
    });
  }else{
    document.location.href = "./ConfirmacaoPresenca.html";
  }
}


function hideLeaderStuff() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "lider") {
    document.getElementById("btnAvaliacoes").style.display = "none";
    document.getElementById("btnFinalizar").setAttribute("onclick", "javascript: comoOperacional()") ;
    document.getElementById("btnFinalizar").innerHTML = "Finalizar participação";
  }
}

function hideLeaderStuffMap() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "lider") {
    document.getElementById("btnChegada").setAttribute("onclick", "javascript: comoOperacionalMap()") ;
    document.getElementById("btnChegada").innerHTML = "Dados Ocorrência <i class='fas fa-arrow-right'></i>";
  }
}

function comoOperacional(){
  swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "A sua participação foi terminada com sucesso, irá ser reencaminhado para o menu principal",
    //type: 'sucess'
  }).then(function () {
    // Redirect the user
    window.location.href = "./MenuPrincipal.html";
    console.log('The Ok Button was clicked.');
  });
}
function comoOperacionalMap(){
  window.location.href = "./DadosOcorrencia.html";
}

function checkEvaluations(){
  if(localStorage.getItem("avaliacao")){
    swal.fire({
      icon: "warning",
      title: "Alerta!",
      text: "A avaliação já foi efetuada.",
      //type: 'sucess'
    }).then(function () {
      // Redirect the user
      window.location.href = "./DadosOcorrencia.html";
      console.log('The Ok Button was clicked.');
    });
  }else{
    window.location.href = "./Avaliacoes.html";
  }
}

function mandar(){
let distrito = document.getElementById("chegadaDistrito").value;
let distrito2= distrito.replace(/ /g,'+');
console.log(distrito2);
let rua = document.getElementById("chegadaRua").value;
let rua2 = rua.replace(/ /g,'+');
console.log(rua2);
window.open(`https://www.google.com/maps/search/?api=1&query=${distrito2}+${rua2}`);
}

function turnRed(btnid){
  console.log(btnid);
  document.getElementById(btnid).style.color="#FF0A0A";//rgb(144 29 29 / 100%)";
}

function turnGreen(btnid){
  console.log(btnid);
  document.getElementById(btnid).style.color="rgb(29 144 53 / 98%)";
}