//funcao para enviar a informacao de que a equipa chegou ao local
function EditArrival() {
  let id_ocorrencia = localStorage.getItem("id_occurrence");

  fetch(
    `https://pspoperacionais.herokuapp.com/occurrences/arriveOccurrence/${id_ocorrencia}`,
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
            title: "Confirmar chegada ao local?",
            showCancelButton: true,
            confirmButtonText: `Confirmar`,
          })
          .then((result) => {
            if (result.isConfirmed) {
              swal
                .fire({
                  icon: "success",
                  title: "Sucesso!",
                  text: "Confirmada a chegada ao local!",
                })
                .then(function () {
                  window.location.href = "./DadosOcorrencia.html";
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
