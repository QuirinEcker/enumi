window.addEventListener('load', () => {
    let button = document.querySelector("#login-button-container button");

    button.addEventListener('click', function() {
        let loginBox = this.parentElement.parentElement;
        let placeHolder = document.querySelector('#place-holder');
        let loginWave = document.querySelector('#login-wave');

        setTimeout(() => {
            placeHolder.style.height = "100vh"
            loginWave.classList.add('enter-animation')
        }, 1000)
        loginBox.style.opacity = '0';
    })
});