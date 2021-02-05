/*
    This repository is sponsored by https://sperg.club
*/

const malformedImageTypes = ["bin_", "net_"]; // VMProtected programs and battle.net launcher.
const rawFilesToSend = ["mp4", "gif", "rar", "txt", "zip", "7z"];
const embedTitle = "Title";
const embedDescription = "Description";

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

app.get("/uploads/:file", function(req, res) {
    let file = req.params.file;
    let fileDots = file.split(".");
    let fileType = fileDots[1];

    if (fs.existsSync("./src/uploads/" + file)) {
        if (rawFilesToSend.includes(fileType)) {
            return res.sendFile(__dirname + "/uploads/" + req.params.file);
        };

        return res.render("ImageTemplate", { image: file, title: embedTitle, description: embedDescription });
    };

    return res.render("UnknownImage");
});

app.listen(process.env.PORT || 3000);