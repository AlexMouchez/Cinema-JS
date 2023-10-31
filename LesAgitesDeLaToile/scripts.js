let i = 0;
let data;
let doto;
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
    .then(function(response) { return response.json() })
    .then(responseData => {
      data =responseData;
      console.log(data);
      for (let index = 0; index < data.results.length; index++) {

        fetch(`https://api.themoviedb.org/3/movie/${data.results[index].id}/videos?language=en-US&page=1`, options)
        .then(function(risponse) { return risponse.json() })
        .then(risponseDoto => {
          doto =risponseDoto;
          console.log(doto);
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
         document.getElementById('modo').innerHTML += `
           <button type="button" class="btn btn-warning btn-sm mb-4 ms-4" data-bs-toggle="modal" data-bs-target="#Modale${index}">
             <img class="d-flex " src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[index].poster_path}">
           </button>

           <div class="modal fade" id="Modale${index}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
             <div class="modal-dialog ">
               <div class="modal-content">
                 <div class="modal-header d-flex justify-content-center text-dark fs-1 text  fw-bold text-uppercase">
                   <h5 class="modal-title" id="ModalLabel">${data.results[index].title}</h5>
                 </div>
                <div class=" d-flex justify-content-center mt-3 ">
                <img  class="bordure-img" src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[index].poster_path}">
                </div>
                 <div class="modal-body">
                   <p>${data.results[index].overview}</p>
                   <hr class="text-secondary " >
                   </div>
                  <div class= "modal-body d-flex justify-content-center h-100 mb-4 " id="Bande-annonce" >
                   <iframe class="border border-2 border-warning"  src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allowfullscreen></iframe>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="bouton-retour" data-bs-dismiss="modal">Retour</button>
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
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.getElementsByClassName('btn btn-warning');



  for (j = 0; j < x.length; j++) {
    if (!data.results[j].title.toLowerCase().includes(input)) {
      x[j].style.display = "none";
    }
    else {
      x[j].style.display = "inline";
    }
  }
}