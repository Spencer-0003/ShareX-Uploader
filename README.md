# Setup

This is a little guide to set up the shareX uploader.

## Requirements

- [Node v15](https://nodejs.org/) Node v12+ should work, but I prefer v15.
- A VPS to host this (Heroku will not work).

## Usage

1. Clone the repo: `git clone https://github.com/Spencer-0003/ShareX-Uploader`
2. Install all dependencies: `yarn` or `npm i`
3. Open `Config.sxcu` in a text editor, e.g. Visual Studio Code.
4. Go to `RequestURL` and change it to `"https://YOUR_DOMAIN/upload"`
5. Go to `URL` and change it to `"http://YOUR_DOMAIN/uploads/$json:url$"`
6. Open `src/views/ImageTemplate` and change all occurrences or `DOMAIN` to your domain.
7. Do the same with `.src/views/UnknownImage`
8. Open `Config.sxcu` to save the config.
9. Open `src/index.js` and change `key` to your key.
10. Change `embedTitle` to your chosen title.
11. Change `embedDescription` to your chosen description.
12. Run the bot: `node .`
   - Using pm2: `pm2 start src/index.js`
