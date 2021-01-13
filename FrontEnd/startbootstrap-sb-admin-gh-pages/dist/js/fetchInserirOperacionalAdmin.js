function RegistOperational() {
    var data = {};
data.email = document.getElementById("inputEmailAddress").value;
data.name = document.getElementById("inputName").value;
let palavraPass = document.getElementById("inputPassword").value;
let rep_password = document.getElementById("inputConfirmPassword").value;
if (palavraPass === "" || rep_password === "") {

    alert("Preencha o campo PalavraPass");
    document.getElementById("inputPassword").focus();
    return false;

} else if (palavraPass != rep_password) {
    alert("Senhas diferentes");
    document.getElementById("inputPassword").focus();
    return false;
} else {
    data.password = palavraPass;
}
console.log(data); //debugging para ver os dados que foram enviados
//chamada fetch para envio dos dados para o servior via POST
fetch(`http://localhost:3000/operationals/adminsInserts`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
})
    .then(function (response) {
        if (!response.ok) {
            console.log(response.status); //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers); //=> Headers
        } else {
            //Swal.fire("Suspeito Registado");
            console.log("Success POST");
            console.log(response);
            swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Operacional Registado!",
                //type: "success"
            }).then(function () {
                // Redirect the user
                window.location.href = "./MenuPrincipal.html";
                console.log('The Ok Button was clicked.');
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
