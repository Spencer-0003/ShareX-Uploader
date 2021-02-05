/*
    This repository is sponsored by https://sperg.club
*/

const express = require("express");
const fs = require("fs");

const app = express();

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", (_req, res) => {
    return res.send("This is a cool homepage.");
});

app.get("/uploads", (_req, res) => {
    return res.redirect("/");
});

app.get("/raw/:file", (req, res) => {
    let file = req.params.file;

    if (fs.existsSync("./uploads/" + file)) {
        return res.sendFile(__dirname + "/uploads/" + file);
    };

    return res.render("UnknownImage");
});




app.listen(process.env.PORT || 3000);