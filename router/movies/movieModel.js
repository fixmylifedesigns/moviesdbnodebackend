const db = require("../../database/dbConfig");

module.exports = {
  add,
  remove,
  getAllMovies,
  findById,
  dateFilter
};

function getAllMovies() {
  return db("movies");
}

async function add(movie) {
  const [id] = await db("movies").insert(movie, "id");

  return findById(id);
}

function remove(id) {
  return db("movies")
    .where({ id })
    .del();
}

function dateFilter(start, end) {
  return db("movies")
    .select()
    .whereBetween("release_date", [start, end]);
}

function findById(id) {
  return db("movies")
    .where("movies.id", id)
    .first();
}
