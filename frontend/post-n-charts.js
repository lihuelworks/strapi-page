// AUTHENTICATION
axios
.post(`http://localhost:1337/auth/local`, {
  identifier: "jipuvuh@getnada.com",
  password: "123456",
})
.then(response => {
  // Handle success.
  console.log('Well done!');
  console.log('User profile', response.data.user);
  console.log('User token', response.data.jwt);
})
.catch(error => {
  // Handle error.
  console.log('An error occurred:', error);
});

//Document load
$(document).ready(function () {
  console.log("POST-N-CHARTS STAAAAAAAAAAART--------")
  //initChart();
  $("#ultimasPelis").click(showMovies);
  $("#compararRating").click(drawMovies);
  //$("#compararRating").click(drawChart(movieList));
});

//put the movies when clicking on first tab
function showMovies() {
  console.log("getting movies");
  var contenido = document.querySelector("#apicontenido");
  contenido.innerHTML = "";
  const link =
    "http://localhost:1337/movies";
  fetch(link)
    .then((res) => res.json())
    .then((info) => {
      console.log(info);
      contenido.innerHTML += `        <br>
        <h3>Te recomendamos la siguientes películas...</h3>
        <h7>Ya te las agregamos para que compares popularidad! (En "Comparar Popularidad")</h4>`;
      for (let index = 0; index < 5; index++) {
        console.log(
          "fetching index",
          index,
          "movie being: ",
          info[index].title
        );
        contenido.innerHTML += `
        <p></p>
        <div class="card border-primary text-white bg-dark mb-3" style="width: 60rem;">
  <div class="row no-gutters">
    <div class="col-md-4" id="clip">
      <img src="https://image.tmdb.org/t/p/w500${info[index].posterurl}" class="card-img" alt="poster de la película">
    </div>
    <div class="col-md-8">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title pricing-card-title">${info[index].title}</h5>
        <p class="card-text">${info[index].overview}</p>
        <p class="card-text align-self-end"><medium class="text-info ">Según imbd, tiene un rating de...</medium> <big class="font-weight-bold"> ${info[index].rating} </big></p>
      </div>
    </div>
  </div>
</div>
              `;
      }
    });
}

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMaterial);

function drawMovies(){
  console.log("drawing movies...");
  var contenido = document.querySelector("#apicontenido");
  contenido.innerHTML = "";
  const link =
    "http://localhost:1337/movies";
  fetch(link)
    .then((res) => res.json())
    .then((info) => {
      console.log("DRAW MOVIEEEEEEEEEEES");
      console.log(info);
      var data = google.visualization.arrayToDataTable([
        ['Pelicula', 'Rating'],
        [info[0].title, info[0].rating],
        [info[1].title, info[1].rating],
        [info[2].title, info[2].rating],
        [info[3].title, info[3].rating],
        [info[4].title, info[4].rating]
      ]);

      var materialOptions = {
        animation:{
        startup: true,
        duration: 1000,
        easing: 'out',
      },
        chart: {
          title: 'Comparando rating de peliculas recomendadas...',
          subtitle: 'Rating según IMDb.com'
        },
        height: 300,
        hAxis: {
          title: 'Titulo de película',
          minValue: 0,
        },
        vAxis: {
          title: 'Rating en decimal'
        },
        bars: 'horizontal'
      };
      var materialChart = new google.charts.Bar(document.getElementById('apicontenido'));
      materialChart.draw(data, materialOptions);
    });
}

//ejemplo boilerplate de Google Charts
/* function drawMaterial() {
      var data = google.visualization.arrayToDataTable([
        ['Pelicula', 'Rating'],
        ['New York City, NY', 3],
        ['Los Angeles, CA', 10],
        ['Chicago, IL', 7],
        ['Houston, TX', 6],
        ['Philadelphia, PA', 5.2]
      ]);

      var materialOptions = {
        animation:{
        startup: true,
        duration: 1000,
        easing: 'out',
      },
        chart: {
          title: 'Comparando rating de peliculas recomendadas...',
          subtitle: 'Rating según IMDb.com'
        },
        height: 300,
        hAxis: {
          title: 'Titulo de película',
          minValue: 0,
        },
        vAxis: {
          title: 'Rating en decimal'
        },
        bars: 'horizontal'
      };
      var materialChart = new google.charts.Bar(document.getElementById('apicontenido'));
      materialChart.draw(data, materialOptions);
    } */