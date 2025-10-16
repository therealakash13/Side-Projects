import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const server = express();
const port = process.env.PORT;

const client = new pg.Pool({
  connectionString: `${process.env.DB_URL}`,
  ssl: { rejectUnauthorized: false },
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

server.get("/", async (req, res) => {
  try {
    const result = await client.query(`SELECT * FROM todo_items`);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

server.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await client.query(`INSERT INTO todo_items (title) VALUES($1)`, [
      item.trim(),
    ]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

server.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;
  try {
    if (id > 0 && title !== "")
      await client.query(`UPDATE todo_items SET title = $1 WHERE id = $2`, [
        title.trim(),
        id,
      ]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

server.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    if (id) await client.query(`DELETE FROM todo_items WHERE id = $1`, [id]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}.`);
});

// Possible future upgrade 
//  1. Sorting based on creation date and other criterion
//  2. Multiple List like ( Today / This Week / This Month ) or ( Completed / Postponed / Dropped )
//  3. Multi User functionality maybe logout login based  