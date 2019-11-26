# crypto-touchbar
A minor experiment into cryptocurrency price tracking and displaying on macOS touchbar using Electron. Currently features BTC/ETH/LTC prices only. 

<img width="1085" alt="Touch Bar Shot 2019-05-23 at 2 37 38 PM" src="https://user-images.githubusercontent.com/8068753/58291522-94efd480-7d72-11e9-837e-88f53ebe9bda.png">

## Stack

- Node.js
- Electron

## Developer Setup

### Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Electron](https://electronjs.org/)
- [Electron Packager](https://github.com/electron/electron-packager)
- [Yarn](https://yarnpkg.com/en/)

### Steps

1.  Run `git clone https://github.com/sduval215/crypto-touchbar.git`.
1.  Navigate inside the downloaded directory and run `yarn install` to install all necessary dependency packages.
1.  Within the root folder run `yarn start`

### Simulator

If you don't have a touch bar on your machine, you can download the MacOS touchbar simulator [here](https://github.com/sindresorhus/touch-bar-simulator)

### Distribute

All application building is handled by the `electron-builder` library. Make sure you have `electron-builder` installed globally. If you don't, run:

```
npm install -g electron-builder
```

Afterwards, run `yarn dist` in the root project folder to build the application.
