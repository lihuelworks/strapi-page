var app = new Vue({
    el: '#app',
    data: {
        token: '',
        movies: {
            "title": "",
            "posterurl": "",
            "rating": "",
            "overview": ""
        }
    },

    methods: {
        async loadDatanPost(url) {
            const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "testload",
                    overview: "overviewload",
                    rating: "ratingload",
                    posterurl: "posterurlload"
                })
            };
            const response = await fetch(url);
            const t = this;
            const data = await response.json();
            let moviePost = {};
            let moviesList = data.results[1];
            for (let index = 0; index < 5; index++) {
                moviesList = data.results[index];
                console.log(moviesList);
                moviePost = {
                    title: moviesList.title,
                    overview: moviesList.overview,
                    rating: moviesList.vote_average,
                    posterurl: moviesList.poster_path
                }
                console.log(moviePost);
                axios.post('http://localhost:1337/movies', moviePost, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                    .then(response => {
                        this.movies.push(response.data);
                    });
            }
        },
        getMovies() {
            axios.get('http://localhost:1337/movies', {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                .then(response => {
                    this.movies = response.data;
                });
        },
        /* createMovies(url) {
            let data = {
                title: this.movies[index].title,
                overview: this.movies[index].overview,
                rating: this.movies[index].vote_average,
                pathposter: this.movies[index].poster_path
            };
            console.log("URL:", url)
            let moviePost = {
                title: "testtitle",
                overview: "overviewwwww",
                rating: "ratiiiing",
                posterurl: "pathpooooooster"
            };
            console.log("createMovies data is", moviePost)
            axios.post('http://localhost:1337/movies', moviePost, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                .then(response => {
                    this.movies.push(response.data);
                });
        }, */
    },
    mounted() {
        let url = "https://api.themoviedb.org/3/discover/movie?api_key=ca2f7ea22ae31011e4f5cdf2fdb8efab&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=3.0";
        axios.post('http://localhost:1337/auth/local', {
            identifier: 'jipuvuh@getnada.com',
            password: '123456'
        }).then(response => {
            this.token = response.data.jwt;
            console.log(">> Done auth, got token:", this.token);
            this.loadDatanPost(url);
            this.getMovies();
        });
    }
})