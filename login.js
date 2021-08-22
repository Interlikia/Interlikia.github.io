if(localStorage.getItem("logged") !== null) {

    loggedIn();

} else {

    loggedOut();

}

function verifyPassword(field) {

    pass = field.value;

    if (pass.length >= 3)
    {
        return true;
    }
    else
    {
        return false;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const registerForm = document.querySelector("#register");
    const errorLogin = document.getElementById("error_login");
    const errorRegister = document.getElementById("error_register");

    loginForm.addEventListener("submit", e => {

        e.preventDefault();

        if(verifyPassword(document.getElementById("user_password")))
        {
            axios.get('http://localhost:3000/auth/user/login', {
                params:{
                    email: document.getElementById("user_login").value,
                    password: document.getElementById("user_password").value
                }
            })
            .then(function (response){ 
                console.log(response);
                if(response.status ===200){
                    localStorage.setItem('token', response.data.data)
                    loggedIn();
                }
            })
            .catch(function(error){
                console.log(error.response.data.error);
            });
        }else{
            errorLogin.innerHTML= "Senha Inválida!";
        }
    })

    

    registerForm.addEventListener("submit", e => {

        e.preventDefault();

        if(verifyPassword(document.getElementById("registration_password")))
        {
            axios.post('http://localhost:3000/auth/user/register', 
            {
                email: document.getElementById("registration_email").value,
                password: document.getElementById("registration_password").value
            })
            .then(function (response) 
            {
                console.log(response);
                if(response.status === 200){
                    errorRegister.style.color = "green";
                    errorRegister.innerHTML = "Cadastrado com Sucesso!";
                }
            })
            .catch(function (error) 
            {
                console.log(error.response.data.error);
            });
        }else{
            errorRegister.innerHTML= "Senha Inválida! Insira uma senha com 3 ou mais caracteres.";
        }
        
    })

})

function loggedIn()
{
    document.getElementById("form_box").classList.remove('display_show');
    document.getElementById("form_box").classList.add('display_hidden');
    document.getElementById("api_jikan").classList.remove('display_hidden');
    document.getElementById("api_jikan").classList.add('display_show');
    document.getElementById("search_box").classList.remove('display_hidden');
    document.getElementById("search_box").classList.add('display_show');
    document.getElementById("log_out_btn").classList.remove('display_hidden');
    document.getElementById("log_out_btn").classList.add('display_show');
    document.getElementById("log_out_btn").addEventListener("click", function(){
        loggedOut();
    })
}

function loggedOut()
{
    localStorage.removeItem("logged");
    document.getElementById("form_box").classList.remove('display_hidden');
    document.getElementById("form_box").classList.add('display_show');
    document.getElementById("api_jikan").classList.remove('display_show');
    document.getElementById("api_jikan").classList.add('display_hidden');
    document.getElementById("search_box").classList.remove('display_show');
    document.getElementById("search_box").classList.add('display_hidden');
    document.getElementById("log_out_btn").classList.remove('display_show');
    document.getElementById("log_out_btn").classList.add('display_hidden');
}