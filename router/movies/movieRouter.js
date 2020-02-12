const router = require("express").Router();
const axios = require("axios");
const moment = require("moment");
const Movies = require("./movieModel");

router.get("/", (req, res) => {
  Movies.getAllMovies()
    .then(movies => {
      //   let hello = "2011-10-31".split('-').join('')
      res.status(200).json(movies);

      //   console.log(moment("2011-10-31").format("YYYY-MM-DDTHH:mm:ssZ"));
      //   console.log(moment(hello.replace('-',''), "YYYYMMDD").subtract(1, 'days').calendar().split('/').join('/'))
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "Cannot retrieve movies from database." });
    });
});

router.post("/filter", (req, res) => {
//    start = req.body.start
//    end = req.body.end
// if (start == "today") {
//    start = moment().format(" YYYY/MM/DD")
// }
//   if (end == "tomorrow") {

//     end = "2017/01/05"
   
//   }
//   console.log(start)
//   console.log(moment().add(1, 'days').format("YYYY/MM/DD"))
  
  Movies.dateFilter(req.body.start, req.body.end)
    .then(movies => {
      res.status(200).json(movies);
      console.log(req.body)
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, message: "Cannot retrieve movies from database." });
    });
});

router.post("/moviesdb", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${req.body.search}&page=${req.body.page}`
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/newmovie", async (req, res) => {
  const post = req.body;
  try {
    const inserted = await Movies.add(post);
    res.status(201).json(inserted);
  } catch (error) {
    res
      .status(500)
      .json({
        error,
        message: "we ran into an error adding this movie to favorites"
      });
  }
});

router.delete("/:id", (req, res) => {
  Movies.remove(req.params.id)
    .then(del => {
      res
        .status(200)
        .json({ message: "the movie has successfully been deleted" })
        .end(del);
    })
    .catch(err => {
      res.status(500).json({ err, message: "this post does not exist" });
    });
});

module.exports = router;
