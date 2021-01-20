function Logout() {
    async function fetchAsync() {
    const response = await fetch(`http://localhost:3000/logout`);
    }
    fetchAsync()
    .then(console.log("ok"), window.location.href = "./login.html", localStorage.clear())
    .catch((reason) => console.log(reason.message));

}