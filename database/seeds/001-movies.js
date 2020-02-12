exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("movies").insert([
        {
          id: 1,
          title: "test",
          movie_id: 2322,
          overview: "testing this test",
          vote_count: 322,
          poster_path:
            "http://image.tmdb.org/t/p/w342/x0tfMxPdkjFYort1BzkGJb7uGmg.jpg",
          release_date: "2019-02-10"
        },
        {
          id: 2,
          title: "test2",
          movie_id: 2622,
          overview: "testing this test",
          vote_count: 322,
          poster_path:
            "http://image.tmdb.org/t/p/w342/x0tfMxPdkjFYort1BzkGJb7uGmg.jpg",
          release_date: "2014-02-10"
        }
      ]);
    });
};
