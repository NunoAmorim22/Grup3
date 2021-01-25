function Logout() {
    async function fetchAsync() {
    const response = await fetch(`http://localhost:3000/logout`);
   
    }
    fetchAsync()
    .then(console.log("ok"), ResetPresence())
    .catch((reason) => console.log(reason.message));

}


 function ResetPresence() {
    let id_operacional = localStorage.getItem("id_operacional");
    
    
   // console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`https://pspoperacionais.herokuapp.com/operationals/checkouts/${id_operacional}`, {
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
          localStorage.clear();
          window.location.href = "./login.html";
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