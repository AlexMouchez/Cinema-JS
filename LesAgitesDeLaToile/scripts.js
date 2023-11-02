let data;
let doto;
let tabGenre = [];
let page=1;
let first =1;
let last;


function init() {
premier();
}

function search() {
  let input = document.getElementById('searchbar').value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName('btn btn-danger');

  for (j = 0; j < x.length; j++) {
    if (!data.results[j].title.toLowerCase().includes(input)) {
      x[j].style.display = "none";
    }
    else {
      x[j].style.display = "inline";
    }
  }
}

function genre(idGenre) {
  const checkBox = document.getElementById(idGenre);
  const x = document.getElementsByClassName('btn btn-danger');

  if (checkBox.checked) {
    tabGenre.push(idGenre);
  } else {
    const cut = tabGenre.indexOf(idGenre);
    if (cut !== -1) {
      tabGenre.splice(cut, 1);
    }
  }

  for (let index = 0; index < x.length; index++) {
    const filmGenre = data.results[index].genre_ids;
    let shouldDisplay = true;
    for (let i = 0; i < tabGenre.length; i++) {
      if (filmGenre.indexOf(tabGenre[i])==-1) {
        shouldDisplay = false;
      }
    }
    x[index].style.display = shouldDisplay ? "inline": "none";
    console.log(data)
    if ( x[index].style.display=="inline") {
      console.log(data.results[index]);
    }
  }
}

function premier(){
  document.getElementById('modo').innerHTML= null;
page = first;
fetchFilm(page);
}

function dernier(){
  document.getElementById('modo').innerHTML= null;
  page = last;
  fetchFilm(page);
}
function nbrP(){
  if (page == 0) {
  }
 else{
  document.getElementById('modo').innerHTML= null;
  page = page-1;
  fetchFilm(page);
 }
}

function nbrS(){
  if (page == 446) {
  }
 else{
  document.getElementById('modo').innerHTML= null;
  page = page+1;
  fetchFilm(page);
}
}
function fetchFilm(page){
  document.getElementById('nbr').innerHTML=page;
  var client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFjYjA0MDk3YTUxNGJiNGE2MGIzODJlYWZjMzczOCIsInN1YiI6IjY1M2I4NGM3Y2M5NjgzMDEyY2YyZmU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Hzx0sesWpwKlhOdnONqoeInZsRFGedj4oqwg30GkRY';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_URL = BASE_URL + `/movie/top_rated?language=en-US&page=${page}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + client_secret
    }
  };

  fetch(API_URL, options)
    .then(function (response) { return response.json() })
    .then(responseData => {
      data = responseData;
      for (let index = 0; index < data.results.length; index++) {

        fetch(`https://api.themoviedb.org/3/movie/${data.results[index].id}/videos?language=en-US`, options)
          .then(function (risponse) { return risponse.json() })
          .then(risponseDoto => {
            doto = risponseDoto;
            last = data.total_pages;
            const videos = doto.results;
            
            let trailerVideo = 0;
            for (let i = 0; i < videos.length; i++) {
              if (videos[i].name.toLowerCase().includes("trailer")) {
                trailerVideo = videos[i];
                break;
              }
            }
            if (trailerVideo) {
              const videoKey = trailerVideo.key;
            }
              fetch(`https://api.themoviedb.org/3/movie/${data.results[index].id}/credits?language=en-US`, options)
              .then(responseCred => responseCred.json())
              .then(responseCred => {
                cred = responseCred;
                
               
                
                if (trailerVideo) {
                  const videoKey = trailerVideo.key;
                  document.getElementById('modo').innerHTML += `
                  <button type="button" class="btn btn-warning btn-sm m-3" data-bs-toggle="modal" data-bs-target="#Modale${index}">
                    <img src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[index].poster_path}">
                  </button>
                  <div class="modal fade" id="Modale${index}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog ">
                      <div class="modal-content">

                        <div class="modal-header d-flex justify-content-center">
                          <h5 class="modal-title" id="ModalLabel">${data.results[index].title}</h5>
                        </div>
                        
                        <div class="modal-body">
                          <p>${data.results[index].overview}</p>
                          
                          
                          <div class="affiche-modal mb-3 d-flex justify-content-center"> 
                          <img class="bordure-img" src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[index].poster_path}">
                          </div>

                          <div class="distrib">
                            <p> Distribution :</p>
                            <p id="acteur${index}">
                            <p> Date de sortie : <br> ${data.results[index].release_date}</p>
                            <p > Note:  ${data.results[index].vote_average} /10</p>
                            <hr >
                          </div>

                            
                            <iframe id="BandeAn" class="mb-4" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allowfullscreen></iframe>
                            
                        
                            
                            
                           <div class="modal-footer">
                            <button type="button" class="bouton-retour" data-bs-dismiss="modal">Retour</button>
                           
                          </div>
                          
                        </div>

                    
                    </div>
                     
                  </div>`;

                 
                  for (let c = 0; c < 5; c++) {
                    console.log(responseCred);
                    if (cred.cast[c].known_for_department=== "Acting") {
                      document.getElementById('acteur' + index).innerHTML += `${cred.cast[c].name} : ${cred.cast[c].character}<br>`;
                    }
                  }
                 


                }
             
            });


            
          });
      }
    });
}

