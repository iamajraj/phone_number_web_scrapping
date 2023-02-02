const express = require("express");
const path = require("node:path");
const { Worker } = require("node:worker_threads");
const { getNumber } = require("./getNumber");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    const worker = new Worker(path.join(__dirname, "getNumbers.js"));
    worker.on("message", (value) => {
        res.render("index", {
            numbers: value,
        });
    });
});

app.get("/:number", async (req, res) => {
    let number = req.params.number;
    let refactored_number = number.split("+")[1];
    const [from, time] = await getNumber(refactored_number);
    res.render("number", {
        from,
        time,
        number,
    });
});

app.listen(4000, () => {
    console.log("started on http://localhost:4000");
});
