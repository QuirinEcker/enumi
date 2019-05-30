import {Konto} from "./Classes/Konto.js";

window.addEventListener('load', () => {
    let button = document.querySelector("#login-button-container button");
    let kontos = [
        new Konto("MaxMustermann", "muster", "m.mustermann@gmail.com"),
        new Konto("Felix", "iLikeMinecraft", "f.woess@gmail.com")
    ];

    button.addEventListener('click', function() {
        let loginBox = this.parentElement.parentElement;
        let placeHolder = document.querySelector('#place-holder');
        let loginWave = document.querySelector('#login-wave');
        let emailField = document.querySelectorAll("input")[0];
        let passwordField = document.querySelectorAll("input")[1];

        console.log(emailField);
        console.log(passwordField);

        kontos.forEach((item) => {
            if (emailField.value === item.email) {
                if (passwordField.value === item.password) {
                    setTimeout(() => {
                        placeHolder.style.height = "100vh";
                        loginWave.classList.add('enter-animation');

                        setTimeout(() => {
                            localStorage.setItem("name", item.username)
                            localStorage.setItem("password", item.password)
                            localStorage.setItem("email", item.email)
                            window.location.href = "/index.html";
                        }, 2000)

                    }, 1000)
                    loginBox.style.opacity = '0';


                }
            }
        });
    })
});