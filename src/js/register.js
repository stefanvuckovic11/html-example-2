document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".register-page__form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var username = document.querySelector("#username").value.trim();
        var email = document.querySelector("#email").value.trim();
        var password = document.querySelector("#password").value;
        var confirmPassword = document.querySelector("#confirm-password").value;
        if (!username || !email || !password || !confirmPassword) {
            alert("Molimo, popunite sva polja.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Lozinke se ne poklapaju.");
            return;
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Unesite ispravan email.");
            return;
        }
        var newUser = {
            username: username,
            email: email,
            password: password
        };
        var xhrGet = new XMLHttpRequest();
        xhrGet.open("GET", "http://localhost:3000/users", true);
        xhrGet.onreadystatechange = function () {
            if (xhrGet.readyState === 4 && xhrGet.status === 200) {
                var users = JSON.parse(xhrGet.responseText);
                var userExists = false;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username === username || users[i].email === email) {
                        userExists = true;
                        break;
                    }
                }
                if (userExists) {
                    alert("Korisnik sa ovim imenom ili email-om već postoji.");
                    return;
                }
                var xhrPost = new XMLHttpRequest();
                xhrPost.open("POST", "http://localhost:3000/users", true);
                xhrPost.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhrPost.onreadystatechange = function () {
                    if (xhrPost.readyState === 4) {
                        if (xhrPost.status >= 200 && xhrPost.status < 300) {
                            alert("Registracija uspješna! Preusmjeravanje na prijavu...");
                            window.location.href = "loginPage.html";
                        } else {
                            alert("Došlo je do greške prilikom registracije.");
                        }
                    }
                };
                xhrPost.send(JSON.stringify(newUser));
            } else if (xhrGet.readyState === 4) {
                alert("Došlo je do greške prilikom provjere postojećih korisnika.");
            }
        };
        xhrGet.send();
    });
});
