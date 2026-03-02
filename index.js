import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { cocktail: null, error: null });
});

app.get("/cocktail", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    const drink = response.data.drinks[0];

    res.render("index", { cocktail: drink, error: null });
  } catch (err) {
    console.log(err.message);
    res.render("index", { cocktail: null, error: "Failed to fetch cocktail." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});