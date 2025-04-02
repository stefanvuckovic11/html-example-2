document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".login-page__form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var loginInput = document.querySelector("#login-username").value.trim();
        var passwordInput = document.querySelector("#login-password").value;

        if (!loginInput || !passwordInput) {
            alert("Molimo, popunite sva polja.");
            return;
        }

        var xhrGet = new XMLHttpRequest();
        xhrGet.open("GET", "http://localhost:3000/users", true);
        xhrGet.onreadystatechange = function () {
            if (xhrGet.readyState === 4 && xhrGet.status === 200) {
                var users = JSON.parse(xhrGet.responseText);
                var userFound = false;
                var matchedUser;
                var i;
                for (i = 0; i < users.length; i++) {
                    if (
                        (users[i].username === loginInput || users[i].email === loginInput) &&
                        users[i].password === passwordInput
                    ) {
                        userFound = true;
                        matchedUser = users[i];
                        break;
                    }
                }
                if (userFound) {
                    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
                    alert("Prijava uspješna! Preusmjeravanje...");
                    window.location.href = "index.html";
                } else {
                    alert("Neispravni podaci. Pokušajte ponovno.");
                }
            } else if (xhrGet.readyState === 4) {
                alert("Došlo je do greške prilikom provjere podataka.");
            }
        };
        xhrGet.send();
    });
});
