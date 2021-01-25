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

//funcao para confirmar o material e guardar informacao que esta confirmacao foi feita
function materialsConfirmation() {
  swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Confirmação de material executada, vai ser reencaminhado para a pagina de menu de ocorrência.",
  }).then(function () {
    // Redirect the user
  localStorage.setItem("confirmacaoMateriais", true);
    window.location.href = "./MenuOcorrencia.html";
    console.log('The Ok Button was clicked.');
  });
}

//funcao para confirmar equipa e guardar informacao que esta foi feita
function teamConfirmation() {
  swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Confirmação de equipa executada, vai ser reencaminhado para a página de menu de ocorrência.",
  }).then(function () {
    // Redirect the user
    localStorage.setItem("confirmacaoEquipa", true);
    window.location.href = "./MenuOcorrencia.html";
    console.log('The Ok Button was clicked.');
  });


}

//funcao para verificar se o user pode avancar no fluxo
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

//funcao para redirecionar o user para a pagina de confirmar chegada
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

//funcao para a limitar acessos a algumas paginas em determinados momentos
function cantGo() {
  swal.fire({
    icon: "warning",
    title: "Alerta!",
    text: "Não pode sair desta página!",
  }).then(function () {
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
  if (localStorage.getItem("tipo") == "Lider") {
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
  })//url("https://cdn.awsli.com.br/600x450/14/14828/produto/34355376/ab054cf50c.jpg")
}

function logout() {
  localStorage.clear();

  document.location.href = "./login.html";
}

function hideAdminStuff() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "Admin") {
    //document.getElementById("adminStuff").style.display = "none";
    document.getElementById("listaOperacionais").style.display = "none";
    document.getElementById("criarContaAdmin").style.display = "none";
  } else {
    document.getElementById("tabelaparamandardebase").style.display = "none";
    document.getElementById("participacoes").style.display = "none";
    document.getElementById("equipaOcorrencia").style.display = "none";

  }
}

function AdminCantGo() {
  let tipo = localStorage.getItem("tipo");
  if (tipo == "Admin") {
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
  } else {
    document.location.href = "./ConfirmacaoPresenca.html";
  }
}
function AdminCantGoProfile() {
  let tipo = localStorage.getItem("tipo");
  if (tipo == "Admin") {
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
  } else {
    document.location.href = "./Perfil.html";
  }
}


function hideLeaderStuff() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "Lider") {
    document.getElementById("outrasInfo").style.display = "none";
    document.getElementById("btnAvaliacoes").style.display = "none";
    document.getElementById("btnFinalizar").setAttribute("onclick", "javascript: comoOperacional()");
    document.getElementById("btnFinalizar").innerHTML = "Finalizar participação";
  }
}

function hideLeaderStuffMap() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "Lider") {
    document.getElementById("btnChegada").setAttribute("onclick", "javascript: comoOperacionalMap()");
    document.getElementById("btnChegada").innerHTML = "Dados Ocorrência <i class='fas fa-arrow-right'></i>";
  }
}

function comoOperacional() {
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
function comoOperacionalMap() {
  window.location.href = "./DadosOcorrencia.html";
}

function checkEvaluations() {
  if (localStorage.getItem("avaliacao")) {
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
  } else {
    window.location.href = "./Avaliacoes.html";
  }
}

function mandar() {
  let distrito = document.getElementById("chegadaDistrito").value;
  let distrito2 = distrito.replace(/ /g, '+');
  console.log(distrito2);
  let rua = document.getElementById("chegadaRua").value;
  let rua2 = rua.replace(/ /g, '+');
  console.log(rua2);
  window.open(`https://www.google.com/maps/search/?api=1&query=${distrito2}+${rua2}`);
}

function turnRed(btnid) {
  console.log(btnid);
  document.getElementById(btnid).style.color = "#FF0A0A";//rgb(144 29 29 / 100%)";
}

function turnGreen(btnid) {
  console.log(btnid);
  document.getElementById(btnid).style.color = "rgb(29 144 53 / 98%)";
}


function recieveMail() {
  if(document.getElementById("forgotEmail").value !== ""){
  localStorage.setItem("Email", document.getElementById("forgotEmail").value);
  }else{
    swal.fire({
      icon: "warning",
      title: "Alerta!",
      text: "Deve submeter um email.",
      //type: 'sucess'
    }).then(function () {
      // Redirect the user
      console.log('The Ok Button was clicked.');
      
    });
    return false;
  }

  document.getElementById("forgotEmailDiv").style.display = "none";
  document.getElementById("forgotPasswordDiv").style.display = "block";
  document.getElementById("forgotRepPassDiv").style.display = "block";
  document.getElementById("forgotbtn").setAttribute("onclick", "javascript: ReporPassword()");
  document.getElementById("forgotbtn").innerHTML = "Submeter Palavra-passe";
}
