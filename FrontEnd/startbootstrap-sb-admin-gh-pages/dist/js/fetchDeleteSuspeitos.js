function DeleteSuspect() {
    var data = {};
    data.id_suspect= document.getElementById("idSuspeito").value;
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/participations/deletesuspects/${data.id_suspect}`, {
    headers: {'Content-Type': 'application/json'},
    method: 'DELETE',
    body: JSON.stringify(data)
    }).then(function (response) {
    if (!response.ok) {
    console.log(response.status); //=> number 100–599
    console.log(response.statusText); //=> String
    console.log(response.headers); //=> Headers
    } else {
   console.log("Success DELETE");
   console.log(response);
   swal.fire({
    icon: "success",
    title: "Sucesso!",
    text: "Suspeito Apagado",
    //type: "success"
}).then(function () {
    // Redirect the user
    window.location.href = "./ListaSuspeitos.html";
    console.log('The Ok Button was clicked.');
});
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }