import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
db.connect();

// Middleware
app.use(express.static("public")); // Serving static files first
app.use(bodyParser.urlencoded({ extended: true })); // Parsing request bodies

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  const countries = result.rows.map(country => country.country_code);
  return countries;
}

async function getTotalCountries() {
  const result = await db.query("SELECT COUNT(*) AS total FROM visited_countries");
  return result.rows[0].total;
}

// Routes
app.get("/", async (req, res) => {
  const countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) = LOWER($1)",
      [input]
    );

    if (result.rows.length === 0) {
      return res.render("index.ejs", { error: "Country not found.", countries: await checkVisited(), total: await getTotalCountries() });
    }

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.render("index.ejs", { success: "Country added successfully.", countries: await checkVisited(), total: await getTotalCountries() });
    } catch (err) {
      console.log(err);
      res.render("index.ejs", { error: "Already added.", countries: await checkVisited(), total: await getTotalCountries() });
    }
  } catch (err) {
    console.log(err);
    res.render("index.ejs", { error: "Database error.", countries: await checkVisited(), total: await getTotalCountries() });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
