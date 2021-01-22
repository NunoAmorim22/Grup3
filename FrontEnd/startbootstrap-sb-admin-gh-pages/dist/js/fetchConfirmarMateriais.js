function MaterialsConfirmation(id_material) {
    var data = {};
    let id_request = localStorage.getItem("id_request")
    
    
    console.log(data); //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/materials/confirmations/${id_request}/materials/${id_material}`, {
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
          document.getElementById("buttonMaterial").style.color="rgb(29 144 53 / 98%)";
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