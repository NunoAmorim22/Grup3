function EditEvaluations() {
    let id_occurrence = localStorage.getItem("id_occurrence");
    localStorage.setItem("avaliacao", true);
/*
    let form1 = document.getElementById("member1");
    let form2 = document.getElementById("member2");
    let form3 = document.getElementById("member3");
    let form4 = document.getElementById("member4");
*/
    let id_operational1 = localStorage.getItem("id_avaliacao1");
    let id_operational2 = localStorage.getItem("id_avaliacao2");
    let id_operational3 = localStorage.getItem("id_avaliacao3");
    let id_operational4 = localStorage.getItem("id_avaliacao4");

    let total_credits1 = localStorage.getItem("avaliacao1");
    let total_credits2 = localStorage.getItem("avaliacao2");
    let total_credits3 = localStorage.getItem("avaliacao3");
    let total_credits4 = localStorage.getItem("avaliacao4");


    var data = {};
    data.grade = document.getElementById("av1").value;
    if (data.grade === "") {
        swal.fire({
            icon: "warning",
            title: "Alerta!",
            text: "Deve avaliar todos os operacionais!",
            type: "warning"
        }).then(function () {
            // Redirect the user
            // window.location.href = "./MenuPrincipal.html";
            console.log('The Ok Button was clicked.');

        });
        return;
    } else {
        data.total_credits = parseInt(data.grade) + parseInt(total_credits1);
    }


    var data1 = {};
    data1.grade = document.getElementById("av2").value;
    if (data1.grade === null) {
        swal.fire({
            icon: "warning",
            title: "Alerta!",
            text: "Deve avaliar todos os operacionais!",
            type: "warning"
        }).then(function () {
            // Redirect the user
            // window.location.href = "./MenuPrincipal.html";
            console.log('The Ok Button was clicked.');

        });
        return;
    } else {
        data1.total_credits = parseInt(data1.grade) + parseInt(total_credits2);
    }


    var data2 = {};
    data2.grade = document.getElementById("av3").value;
    if (data2.grade === null) {
        swal.fire({
            icon: "warning",
            title: "Alerta!",
            text: "Deve avaliar todos os operacionais!",
            type: "warning"
        }).then(function () {
            // Redirect the user
            // window.location.href = "./MenuPrincipal.html";
            console.log('The Ok Button was clicked.');

        });
        return;
    } else {
        data2.total_credits = parseInt(data2.grade) + parseInt(total_credits3);
    }


    var data3 = {};
    data3.grade = document.getElementById("av4").value;
    if (data3.grade === null) {
        swal.fire({
            icon: "warning",
            title: "Alerta!",
            text: "Deve avaliar todos os operacionais!",
            type: "warning"
        }).then(function () {
            // Redirect the user
            // window.location.href = "./MenuPrincipal.html";
            console.log('The Ok Button was clicked.');

        });
        return;
    } else {
        data3.total_credits = parseInt(data3.grade) + parseInt(total_credits4);
    }

    


    console.log(data); 
    console.log(data1);
    console.log(data2);
    console.log(data3);
    //debugging para ver os dados que foram enviados
    //chamada fetch para envio dos dados para o servior via POST
    fetch(`http://localhost:3000/evaluations/occurrences/${id_occurrence}/refresh/${id_operational1}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data),
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
                    icon: "success",
                    title: "Sucesso!",
                    text: "Avaliações atribuidas e atualizadas",
                    //type: "success"
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
    fetch(`http://localhost:3000/evaluations/occurrences/${id_occurrence}/refresh/${id_operational2}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data1),
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
                    icon: "success",
                    title: "Sucesso!",
                    text: "Avaliações atribuidas e atualizadas",
                    //type: "success"
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
    fetch(`http://localhost:3000/evaluations/occurrences/${id_occurrence}/refresh/${id_operational3}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data2),
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
                    icon: "success",
                    title: "Sucesso!",
                    text: "Avaliações atribuidas e atualizadas",
                    //type: "success"
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
    fetch(`http://localhost:3000/evaluations/occurrences/${id_occurrence}/refresh/${id_operational4}`, {
        headers: { "Content-Type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data3),
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
                    icon: "success",
                    title: "Sucesso!",
                    text: "Avaliações atribuidas e atualizadas",
                    //type: "success"
                }).then(function () {
                    // Redirect the user
                    window.location.href = "./DadosOcorrencia.html";
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