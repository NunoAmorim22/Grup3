function DeleteOperational(id) {
    var data = {};
    data.id_operational= id;
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/operationals/deletes/${data.id_operational}`, {
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
    text: "Operacional Apagado",
    //type: "success"
}).then(function () {
    // Redirect the user
    window.location.href = "";
    console.log('The Ok Button was clicked.');
});
    }
    }).then(function (result) {console.log(result);
    }).catch(function (err) {alert("Submission error"); console.error(err);
    });
    }