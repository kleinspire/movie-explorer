import express from "express";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 4000;
const TMDB_PAGE_SIZE = 20;
const CLIENT_PAGE_SIZE = 10; // Must be either 1, 2, 4, 5 or 10 so that it could be easily synced with the TMDB_PAGE_SIZE

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:4173", "http://localhost:5173"];

/**
 * Middleware to handle CORS
 */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**
 * Fetches data from TMDB API and processes it to match client pagination.
 * @param {string} url - The URL to fetch data from TMDB API.
 * @param {number} clientPage - The page number requested by the client.
 * @returns {Promise<Object>} - Processed data with movies and pagination info.
 * @throws {Object} - Error object containing status and data.
 */
const fetchTmdbData = async (url, clientPage) => {
  // Calculate TMDB API page based on client page
  const page = Math.ceil(clientPage / (TMDB_PAGE_SIZE / CLIENT_PAGE_SIZE));

  const response = await fetch(
    `${url}&page=${page}&api_key=${process.env.TMDB_API_KEY}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, data: errorData };
  }

  const data = await response.json();
  // Calculate the start index for slicing results
  const startIndex =
    ((clientPage - 1) % (TMDB_PAGE_SIZE / CLIENT_PAGE_SIZE)) * CLIENT_PAGE_SIZE;
  // Slice the results to match client page size
  const movies = data.results.slice(startIndex, startIndex + CLIENT_PAGE_SIZE);

  return {
    pages: Math.ceil((data.total_pages * TMDB_PAGE_SIZE) / CLIENT_PAGE_SIZE),
    results: data.total_results,
    movies,
  };
};

/**
 * Route to get popular movies.
 * @route GET /movies
 * @param {number} req.query.page - The page number requested by the client.
 * @returns {Object} - JSON response with movies and pagination info.
 */
app.get("/movies", async (req, res) => {
  const clientPage = parseInt(req.query.page, 10) || 1;
  try {
    const data = await fetchTmdbData(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`,
      clientPage
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.data || "Error fetching movies data" });
  }
});

/**
 * Route to get details of a specific movie.
 * @route GET /movie/:id
 * @param {string} req.params.id - The ID of the movie.
 * @returns {Object} - JSON response with movie details.
 */
app.get("/movie/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${req.params.id}?language=en-US&api_key=${process.env.TMDB_API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching movie data" });
  }
});

/**
 * Route to search for movies.
 * @route GET /search
 * @param {string} req.query.query - The search query.
 * @param {number} req.query.page - The page number requested by the client.
 * @returns {Object} - JSON response with search results and pagination info.
 */
app.get("/search", async (req, res) => {
  const query = req.query.query || "";
  const clientPage = parseInt(req.query.page, 10) || 1;
  try {
    const data = await fetchTmdbData(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US`,
      clientPage
    );
    res.json(data);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.data || "Error fetching movies data" });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
