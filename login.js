if (localStorage.getItem("token") !== null) {

    loggedIn();

} else {

    loggedOut();

}

function verifyPassword(field) {

    pass = field.value;

    if (pass.length >= 3) {
        return true;
    }
    else {
        return false;
    }

}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const registerForm = document.querySelector("#register");
    const errorLogin = document.getElementById("error_login");
    const errorRegister = document.getElementById("error_register");

    loginForm.addEventListener("submit", e => {

        e.preventDefault();
        errorLogin.innerHTML = ""

        if (!emailIsValid(document.getElementById("user_login").value)) {
            errorLogin.innerHTML = "Email inválido";
        } else if (verifyPassword(document.getElementById("user_password"))) {
            axios.get('https://artureicaroweb.herokuapp.com/auth/user/login', {
                params: {
                    email: document.getElementById("user_login").value,
                    password: document.getElementById("user_password").value
                }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.data)
                        loggedIn();
                    } else if (response.status === 201) {
                        errorLogin.innerHTML = response.data.error
                    }
                })
                .catch(function (error) {
                    console.log(error.response.data.error);
                    errorLogin.innerHTML = error.response.data.error;
                });
        } else {
            errorLogin.innerHTML = "A senha deve conter pelo menos 3 caracteres.";
        }
    })



    registerForm.addEventListener("submit", e => {

        e.preventDefault();
        errorRegister.innerHTML = "";

        if (!emailIsValid(document.getElementById("registration_email").value)) {
            errorRegister.innerHTML = "Email inválido";
        } else if (verifyPassword(document.getElementById("registration_password"))) {
            axios.post('https://artureicaroweb.herokuapp.com/auth/user/register',
                {
                    email: document.getElementById("registration_email").value,
                    password: document.getElementById("registration_password").value
                })
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        errorRegister.style.color = "green";
                        errorRegister.innerHTML = "Cadastrado com Sucesso!";
                    } else if (response.status === 201) {
                        errorRegister.innerHTML = response.data.error
                    }
                })
                .catch(function (error) {
                    console.log(error.response.data.error);
                });
        } else {
            errorRegister.innerHTML = "Senha Inválida! Insira uma senha com 3 ou mais caracteres.";
        }

    })

})

function loggedIn() {
    document.getElementById("form_box").classList.remove('display_show');
    document.getElementById("form_box").classList.add('display_hidden');
    document.getElementById("api_anime").classList.remove('display_hidden');
    document.getElementById("api_anime").classList.add('display_show');
    document.getElementById("search_box").classList.remove('display_hidden');
    document.getElementById("search_box").classList.add('display_show');
    document.getElementById("log_out_btn").classList.remove('display_hidden');
    document.getElementById("log_out_btn").classList.add('display_show');
    document.getElementById("log_out_btn").addEventListener("click", function () {
        loggedOut();
    })
}

function loggedOut() {
    localStorage.removeItem("token");
    document.getElementById("form_box").classList.remove('display_hidden');
    document.getElementById("form_box").classList.add('display_show');
    document.getElementById("api_anime").classList.remove('display_show');
    document.getElementById("api_anime").classList.add('display_hidden');
    document.getElementById("search_box").classList.remove('display_show');
    document.getElementById("search_box").classList.add('display_hidden');
    document.getElementById("log_out_btn").classList.remove('display_show');
    document.getElementById("log_out_btn").classList.add('display_hidden');
    document.getElementById("register_box").classList.remove('display_show');
    document.getElementById("register_box").classList.add('display_hidden');
}