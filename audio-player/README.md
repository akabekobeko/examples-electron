# Electron Audio Player

Example of simple audio player in [Electron](http://electron.atom.io/).

**Main UI**

![Main UI](ss-1.png)

**Spectrum Analizer**

Click on the music information area the spectrum analyzer is displayed.

![Screenshot](ss-2.png)

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

## Release build

Build the app for production.
Please build individually because there is a platform-specific processing.

```bash
npm run release:osx
npm run release:win
npm run release:linux
```

or

```bash
npm run release:build
npm run release:pack-osx
npm run release:pack-win
npm run release:pack-linux
```

* It is also will be skipped by running the `release:osx` or `release:pack-osx` in the Windows environment.

### Package for Windows in macOS

How to build a package for Windows in macOS. Introduction you will install the [WineHQ](https://www.winehq.org/). It is recommended that you use the [Homebrew](http://brew.sh/).

```bash
brew install wine
```

Then run the following command. If it is correct environment you should succeed to build the package for Windows.

```bash
npm run release:win
```

or

```bash
npm run release
```

`release` is a package for all platforms.

## DEBUG variable

It is available `DEBUG` variable for debugging dedicated processing.

```js
if( DEBUG ) {
  // Debug only...
}
```

This process will be removed in a release version.

## License

[MIT](LICENSE)
