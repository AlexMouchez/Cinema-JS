// JAVASCRIPT - UTILISATION DE L'API TMDB

let i = 0;
let data;


function init() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWFiYTEwZWM2MWQ4YmZiNDQxMDc3Mzg3Y2E4OGRiNSIsInN1YiI6IjY1M2Y2Y2EyNTE5YmJiMDBjNDM1MmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IoSRZn-eyQ3wJFfpjtv6L03Mc_zyfFqFlrXAtcBbky0'
    }
  };



  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (index = 0; index < data.results.length; index++) {

        fetch ('https://api.themoviedb.org/3/movie/$%7Bdata.results[index].id%7D/videos?language=en-US`', options)





        document.getElementById('cardz').innerHTML += `

<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModale${index}">
<img src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[index].poster_path}">
</button>


<div class="modal ${index}" id="exampleModale${index}" tabindex="${index}" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog " >
  <div class="modal-content">
    <div class="modal-header d-flex justify-content-center">
      <h5 class="modal-title text-center" id="exampleModalLabel">${data.results[index].title}</h5>
    
    </div>

<div class="modal-img d-flex justify-content-center mt-3" id="imagefilm">  <img src="https://www.themoviedb.org/t/p/w220_and_h330_face${data.results[index].poster_path}"> </div>


    <div class="modal-body"> 
    ${data.results[index].overview}
    </div>

      
    <div class="modal-footer">
      <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Fermer</button>
      
    </div>
  </div>
</div>
</div>
 
`
      }
    }
    )


    .catch(err => console.error(err));
}

