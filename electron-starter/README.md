# Electron Starter Kit

This is a starter kit of the [Electron](http://electron.atom.io/) application development.

## Installation

1. Install [Node.js](https://nodejs.org/)
2. `cd PROJECTDIR`
3. `npm install`

## Development

### Watch

Run the watch files, background complie JavaScript/CSS.

```bash
npm start
```

If you want to operate with Windows will fix the **watch:js-main** and **watch:js-renderer** of npm-scripts as follows.

```js
{
  "watch:js-main": "watchify -v -t babelify ./src/js/main/Main.js --im --no-detect-globals -o ./src/main.js -d",
  "watch:js-renderer": "watchify -v -t babelify ./src/js/renderer/App.js -o ./src/bundle.js -d"
}
```

## Launch application

Launch the Electron app on [electron-prebuilt](https://www.npmjs.com/package/electron-prebuilt).
Target for the src dir.

```bash
npm run app
```

### Unit test

Run the ES6 code of unit tests on [mocha](https://www.npmjs.com/package/mocha) ( with [power-assert](https://www.npmjs.com/package/power-assert) and [espower-babel](https://www.npmjs.com/package/espower-babel) ).

```bash
npm test
```

## Code document

Run the code document generation by [esdoc](https://www.npmjs.com/package/esdoc).

```bash
npm run esdoc
```

### Release build

Build the app for production.

```bash
npm run release
```

## License

[MIT](LICENSE)
