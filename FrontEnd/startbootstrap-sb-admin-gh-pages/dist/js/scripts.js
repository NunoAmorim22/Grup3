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
  swal.fire({
    icon: "warning",
    title: "Alerta!",
    text: "Não pode sair desta página!",
  }).then(function () {
  });
}

//Função para ativar a edição dos dados dos suspeitos;
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

//Função para ativar a edição dos dados da testemunhas;
function enableEditionWitness() {
  document.getElementById("guardarTestemunha").style.display = "block";
  document.getElementById("nomeTestemunha").readOnly = false;
  document.getElementById("sexoTestemunha").removeAttribute("disabled");
  document.getElementById("naturalidadeTestemunha").readOnly = false;
  document.getElementById("ccTestemunha").readOnly = false;
  document.getElementById("dataTestemunha").readOnly = false;
  document.getElementById("contactoTestemunha").readOnly = false;
  document.getElementById("profissaoTestemunha").readOnly = false;
  document.getElementById("emailTestemunha").readOnly = false;
  document.getElementById("moradaTestemunha").readOnly = false;
  document.getElementById("localidadeTestemunha").readOnly = false;
}

//Função para ativar a edição dos dados da vitima;
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

//Função para o botao, na lista de suspeitos, para levar o id para a pagina de editar os dados;
function transportid(idtotransport) {
  localStorage.setItem("id_suspect", idtotransport);
  document.location.href = "./DadosSuspeitos.html";
}

//Função para o botao, na lista de testemunhas, para levar o id para a pagina de editar os dados;
function transportidTestemunha(idtotransport) {
  localStorage.setItem("id_witness", idtotransport);
  document.location.href = "./DadosTestemunha.html";
}

//Função para o botao, na lista de vitimas, para levar o id para a pagina de editar os dados;
function transportidVitima(idtotransport) {
  localStorage.setItem("id_victim", idtotransport);
  document.location.href = "./DadosVitimas.html";
}

//Função para o botao de aceitar ocorrencia, no modo lider, para enviar o id da ocorrencia;
function transportidOccurrence(idtotransport) {
  if (localStorage.getItem("tipo") == "Lider") {
    localStorage.setItem("id_occurrence", idtotransport);
    document.location.href = "./MenuOcorrencia.html";
  } else {
    localStorage.setItem("id_occurrence", idtotransport);
    document.location.href = "./ConfirmarChegada.html";
  }
}

//Função que tem de ser descoberta pelo professor;
//Nos queriamos colocar a opção de alterar a foto de perfil mas ocorreu um imprevisto e nao tivemos tempo, logo criamos esta função 
//para que todos os botoes tivessem interação
function coisaLinda() {
  Swal.fire({
    title: 'Tentamos...',
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

//Função para esconder as opções do dropdown do menu principal que pertencem ao admin
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

//Função para impedir que o admin se redirecione para algumas paginas
function AdminCantGo() {
  let tipo = localStorage.getItem("tipo");
  if (tipo == "Admin") {
    swal.fire({
      icon: "warning",
      title: "Alerta!",
      text: "Não pode aceder a esta página!",
      //type: 'sucess'
    }).then(function () {
    });
  } else {
    document.location.href = "./ConfirmacaoPresenca.html";
  }
}

//Função para impedir que o admin se redirecione para algumas paginas (como por exemplo o perfil porque nao é operacional!);
function AdminCantGoProfile() {
  let tipo = localStorage.getItem("tipo");
  if (tipo == "Admin") {
    swal.fire({
      icon: "warning",
      title: "Alerta!",
      text: "Não pode aceder a esta página!",
    }).then(function () {
    });
  } else {
    document.location.href = "./Perfil.html";
  }
}

//Função para dentro das ocorrencias, esconder no menu lateral das ocorrencias, a opção de avaliações para os operacionais;
function hideLeaderStuff() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "Lider") {
    document.getElementById("outrasInfo").style.display = "none";
    document.getElementById("btnAvaliacoes").style.display = "none";
    document.getElementById("btnFinalizar").setAttribute("onclick", "javascript: comoOperacional()");
    document.getElementById("btnFinalizar").innerHTML = "Finalizar participação";
  }
}

//Função para na pagina do "ConfirmarChegada" so o lider conseguir marcar a chegada ao local; 
function hideLeaderStuffMap() {
  let tipo = localStorage.getItem("tipo");
  if (tipo != "Lider") {
    document.getElementById("btnChegada").setAttribute("onclick", "javascript: comoOperacionalMap()");
    document.getElementById("btnChegada").innerHTML = "Dados Ocorrência <i class='fas fa-arrow-right'></i>";
  }
}

//Função para quando a aplicação é usada por um operacional e ele quer terminar a sua participação na função;
function comoOperacional() {
  swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "A sua participação foi terminada com sucesso, irá ser reencaminhado para o menu principal",
  }).then(function () {
    // Redirect the user
    window.location.href = "./MenuPrincipal.html";
    console.log('The Ok Button was clicked.');
  });
}

//Função para enviar os operacionais, que nao sao lideres, para a localização de uma ocorrência;
function comoOperacionalMap() {
  window.location.href = "./DadosOcorrencia.html";
}

//Função que verifica se a avaliação aos operacionais ja foi feita, e nao o deixa repetir a avaliação;
function checkEvaluations() {
  if (localStorage.getItem("avaliacao")) {
    swal.fire({
      icon: "warning",
      title: "Alerta!",
      text: "A avaliação já foi efetuada.",
    }).then(function () {
      // Redirect the user
      window.location.href = "./DadosOcorrencia.html";
      console.log('The Ok Button was clicked.');
    });
  } else {
    window.location.href = "./Avaliacoes.html";
  }
}

//Função auxiliar do Mapa, para enviar a localização da operação para o google Maps;
function mandar() {
  let distrito = document.getElementById("chegadaDistrito").value;
  let distrito2 = distrito.replace(/ /g, '+');
  console.log(distrito2);
  let rua = document.getElementById("chegadaRua").value;
  let rua2 = rua.replace(/ /g, '+');
  console.log(rua2);
  window.open(`https://www.google.com/maps/search/?api=1&query=${distrito2}+${rua2}`);
}

//Função para colocar os botões da pagina do "ConfirmarMaterial" a vermelho caso nao se confirme o material;
function turnRed(btnid) {
  console.log(btnid);
  document.getElementById(btnid).style.color = "#FF0A0A";
}

//Função para colocar os botões da pagina do "ConfirmarMaterial" a verde caso se confirme o material;
function turnGreen(btnid) {
  console.log(btnid);
  document.getElementById(btnid).style.color = "rgb(29 144 53 / 98%)";
}

//Na Página de repor palavra-passe, esta função verifica se foi colocado um email
// no input e disponibiliza os inputs para alterar a palavra passe;
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
