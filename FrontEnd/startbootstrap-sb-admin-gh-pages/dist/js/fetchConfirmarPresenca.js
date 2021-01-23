function ConfirmPresence() {
    let id_operacional = localStorage.getItem("id_operacional");
    
    
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/operationals/checkins/${id_operacional}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    })
      .then(function (response) {
        if (!response.ok) {
          console.log(response.status); //=> number 100–599
          console.log(response.statusText); //=> String
          console.log(response.headers); //=> Headers
        } else {
          // Swal.fire("Suspeito Atualizado");
          console.log("Success PUT");
          console.log(response);
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
              text:"Presença confirmada!",
            }).then(function () {
              // Redirect the user
              window.location.href = "./MenuPrincipal.html";
              console.log('The Ok Button was clicked.');
            });
            } 
          });
        }
      })
      .then(function (result) {
        console.log(result);
      })
      .catch(function (err) {
        alert("Submission error");
        console.error(err);
      });
  }