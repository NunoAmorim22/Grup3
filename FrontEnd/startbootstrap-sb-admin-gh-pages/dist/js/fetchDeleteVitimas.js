function DeleteVictim() {
    var data = {};
    data.id_victim = document.getElementById("idVitima").value;
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/participations/deleteVictims/${data.id_victim}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
        body: JSON.stringify(data)
    }).then(function (response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
        } else {
            //Swal.fire("Vitima Apagada");
            swal.fire({
                title: "Success!",
                text: "Vitima Apagada",
                type: "success"
              }).then(function () {
                // Redirect the user
                window.location.href = "./ListaVitimas.html";
                console.log('The Ok Button was clicked.');
              });
            console.log("Success DELETE");
            console.log(response);
            //document.location.href="./ListaVitimas.html";
        }
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        alert("Submission error"); console.error(err);
    });
}