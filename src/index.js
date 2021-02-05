/*
    This repository is sponsored by https://sperg.club
*/

// Define important variables.

const malformedImageTypes = ["bin_", "net_"]; // VMProtected programs (maybe other obfuscated programs too?) and battle.net launcher.
const rawFilesToSend = ["mp4", "gif", "rar", "txt", "zip", "7z"];

const embedTitle = "Title";
const embedDescription = "Description";
const uploaderKey = "key"; // Change this to your key!

// Define functions

function randomString(length) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };

    return result;
};

// Require modules

const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const rateLimit = require("express-rate-limit");
const fileUpload = require("express-fileupload");
const fs = require("fs");

// Create Express App

const app = express();

// Make app use modules

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(cors());
app.use(helmet());

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "You are sending too many requests, please try again later.",
    headers: true
}));

app.use(fileUpload({
    limits: { fileSize: 5000 * 1024 * 1024 }
}));

// Create webpages.

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

app.post("/upload", (req, res) => {
    let key = req.body.key;
    let file = req.files.sharex;

    if (key !== uploaderKey) {
        return res.json({ message: "Invalid key.", type: "error" });
    };

    if (!file) {
        return res.json({ message: "File not found.", type: "error" });
    };


});

app.listen(process.env.PORT || 3000);