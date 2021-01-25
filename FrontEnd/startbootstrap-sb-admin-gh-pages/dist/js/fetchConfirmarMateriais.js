function MaterialsConfirmation(id_material, btnid) {
  var data = {};
  let id_request = localStorage.getItem("id_request");

  console.log(data); 
  fetch(`https://pspoperacionais.herokuapp.com/materials/confirmations/${id_request}/materials/${id_material}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
  })
    .then(function (response) {
      if (!response.ok) {
        console.log(response.status); //=> number 100–599
        console.log(response.statusText); //=> String
        console.log(response.headers); //=> Headers
      } else {
        console.log("Success PUT");
        console.log(response);
        document.getElementById(btnid).style.color = "rgb(29 144 53 / 98%)";
        let arraydemateriais = JSON.parse(localStorage.getItem("materiais"));
        arraydemateriais[arraydemateriais.length] = id_material;
        console.log(arraydemateriais.length);
        localStorage.setItem("materiais", JSON.stringify(arraydemateriais));
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