let i = 0;
let data;
let doto;
let tabGenre = [];
function init() {

  var client_secret = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFjYjA0MDk3YTUxNGJiNGE2MGIzODJlYWZjMzczOCIsInN1YiI6IjY1M2I4NGM3Y2M5NjgzMDEyY2YyZmU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Hzx0sesWpwKlhOdnONqoeInZsRFGedj4oqwg30GkRY';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const API_URL = BASE_URL + '/movie/top_rated?language=en-US&page=1';


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
            
            const videos = doto.results;

            let trailerVideo = 0;
            for (let i = 0; i < 5; i++) {
              if (videos[i].name.toLowerCase().includes("trailer")) {
                trailerVideo = videos[i];
                break;
              }
            }


            if (trailerVideo) {
              const videoKey = trailerVideo.key;
              document.getElementById('modo').innerHTML += `
           <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#Modale${index}">
             <img src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[index].poster_path}">
           </button>

           <div class="modal fade" id="Modale${index}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
             <div class="modal-dialog modal-fullscreen">
               <div class="modal-content">
                 <div class="modal-header">
                   <h5 class="modal-title" id="ModalLabel">${data.results[index].title}</h5>
                 </div>
                 <div class="modal-body">
                   <p>${data.results[index].overview}</p>
                   <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allowfullscreen></iframe>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                 </div>
               </div>
             </div>
           </div>
           
         `;

            }
          });
      }
    });




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


/*function genre(idGenre) {
  tabGenre.push(idGenre);

  let x = document.getElementsByClassName('btn btn-danger');

  for (j = 0; j < x.length; j++) {
    console.log(data);
   let filmGenre = data.results[j].genre;
    if (!filmGenre.includes(tabGenre)) {
      x[j].style.display = "none";
    }
    else {
      x[j].style.display = "inline";
    }
  }
}*/

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

  for (let j = 0; j < x.length; j++) {
    const filmGenre = data.results[j].genre_ids;
    let shouldDisplay = true;

    for (let r = 0; r < tabGenre.length; r++) {
      if (filmGenre.includes(tabGenre[r])) {
        shouldDisplay = true;
        break;
      }
      else{
        shouldDisplay = false;
      }
    }

    x[j].style.display = shouldDisplay ? "inline"  || console.log(data.results[j].genre_ids): "none";
    if (shouldDisplay ==true ) {
      console.log(data.results[j])
    }
  }
}