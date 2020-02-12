exports.up = function(knex) {
  return knex.schema.createTable("movies", tbl => {
    tbl.increments();

    tbl.string("title").notNullable();

    tbl
      .integer("movie_id")
      .notNullable()
      .unique();

    tbl.string("overview", 1000).notNullable();

    tbl.integer("vote_count").notNullable();

    tbl.string("poster_path").notNullable();

    tbl.string("release_date").notNullable();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
