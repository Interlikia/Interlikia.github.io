document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector("#api_box");
  
    searchForm.addEventListener("submit", e => {
  
      e.preventDefault();
      document.getElementById("api_anime").innerHTML = '';
  
      axios.get('https://api.jikan.moe/v3/search/anime?q=' + document.getElementById("search").value)
        .then(function (response) {
          // handle success
          console.log(response);
  
          var dataResults = response.data.results;
          var apiAnime = document.getElementById("api_anime");
  
          dataResults.forEach((element) => {
            var result = document.createElement("div");
            var title = document.createElement("span");
            var img = document.createElement("img");
  
            title.innerHTML = element.title;
            img.src = element.image_url;
  
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