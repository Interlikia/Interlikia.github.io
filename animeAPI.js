document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#api_box");

  searchForm.addEventListener("submit", e => {

    e.preventDefault();
    document.getElementById("api_anime").innerHTML = '';

    axios.get('http://localhost:3000/api/lookup', {
      params: {
        title: document.getElementById("search").value,
        token: localStorage.getItem('token')
      }
    })
      .then(function (response) {
        // handle success
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
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#api_box_register");

  searchForm.addEventListener("submit", e => {

    e.preventDefault();
    document.getElementById("api_anime").innerHTML = '';

    axios.post('http://localhost:3000/api/create', {
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
        errortext.innerHTML = 'Sucesso.'
        error.appendChild(errortext);
      }
    }).catch(function (error) {
      console.log(error);
    });
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