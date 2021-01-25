//funcao para o operacional confirmar a presenca e que esta a postos
function ConfirmPresence() {
  let id_operacional = localStorage.getItem("id_operacional");

  fetch(
    `https://pspoperacionais.herokuapp.com/operationals/checkins/${id_operacional}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    }
  )
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
        console.log("Success PUT");
        console.log(response);
        swal
          .fire({
            title: "Confirmar presença?",
            showCancelButton: true,
            confirmButtonText: `Confirmar`,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swal
                .fire({
                  icon: "success",
                  title: "Sucesso!",
                  text: "Presença confirmada!",
                })
                .then(function () {
                  window.location.href = "./MenuPrincipal.html";
                  console.log("The Ok Button was clicked.");
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
