function ifEmpty(field) {

  if (field.length >= 1) {
    return true;
  } else {
    return false;
  }

}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#api_box");

  searchForm.addEventListener("submit", e => {

    e.preventDefault();
    document.getElementById("api_anime").innerHTML = '';
    const message_search = document.getElementById("anime_search_message");
    message_search.innerHTML = ""

    if (!ifEmpty(document.getElementById("search").value)) {
      message_search.innerHTML = "O campo não pode estar vazio, digite pelo menos um caractere."
    } else {
      axios.get('https://artureicaroweb.herokuapp.com/api/lookup', {
        params: {
          title: document.getElementById("search").value,
          token: localStorage.getItem('token')
        }
      }).then(function (response) {
        if(response.status === 200){
            console.log(response);

            var data = response.data.data;
            var apiAnime = document.getElementById("api_anime");

            data.forEach((element) => {
              var result = document.createElement("div");
              var title = document.createElement("span");
              var img = document.createElement("img");

              title.innerHTML = element.title;
              img.src = element.image;

              result.appendChild(title);
              result.appendChild(img);
              apiAnime.appendChild(result);
            });
          }else if (response.status === 201) {
            message_search.innerHTML = response.data.error
          }
        })
        .catch(function (error) {
          console.log(error.response);
          message_search.innerHTML = error.response.data.error
        })
        .then(function () {
        })
    }
})

    
})

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#api_box_register");

  searchForm.addEventListener("submit", e => {

    e.preventDefault();
    document.getElementById("api_anime").innerHTML = '';
    const message = document.getElementById("anime_register_message");
    const message_error = document.getElementById("anime_register_error");
    message.innerHTML = ""
    message_error.innerHTML = ""

    if(!ifEmpty(document.getElementById("register_title").value)){
      message_error.innerHTML = "O campo titulo não pode estar vazio, digite pelo menos um caractere."
    } else if(!ifEmpty(document.getElementById("register_img").value)){
      message_error.innerHTML = "O campo imagem não pode estar vazio, insira o link para uma imagem."
    }else{
      axios.post('https://artureicaroweb.herokuapp.com/api/create', {
      title: document.getElementById("register_title").value,
      image: document.getElementById("register_img").value,
      token: localStorage.getItem('token')
    }, {
      headers: {
        Accept: "application/json", "Content-Type": "application/json"
      }
    }).then(function (response) {
      console.log(response)
      if (response.status === 200) {
        message.innerHTML = 'Anime cadastrado com sucesso.'
      }else if (response.status === 201) {
        message_error.innerHTML = response.data.error
      }
    }).catch(function (error) {
      console.log(error.response);
      message_error.innerHTML = error.response.data.error
    });
    }
    
  })
})

document.getElementById("btn_register").addEventListener("click", function () {
  document.getElementById("api_anime").innerHTML = "";
  document.getElementById("search_box").classList.remove("display_show");
  document.getElementById("search_box").classList.add("display_hidden");
  document.getElementById("register_box").classList.remove("display_hidden");
  document.getElementById("register_box").classList.add("display_show");
})


document.getElementById("btn_search").addEventListener("click", function () {
  document.getElementById("api_anime").innerHTML = "";
  document.getElementById("register_box").classList.remove("display_show");
  document.getElementById("register_box").classList.add("display_hidden");
  document.getElementById("search_box").classList.remove("display_hidden");
  document.getElementById("search_box").classList.add("display_show");
})