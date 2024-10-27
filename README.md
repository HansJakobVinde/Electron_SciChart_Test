# Electron + SchiChart Graphing Test

## Setup

1. Make sure the Revolve-Relay Mocking Server is running
2. `npm install`
3. `npm run build`
4. `npm start`


## Description

### WebSocketHandler.js
Responsible for receiving data from the mocking server and creating dataMessage-objects from the data that is sent ti index.js

### index.js and index.html
Index.js creates a BrowserWindow that displays index.html
It also receives data from the WebSocketHandler and sends it further through webContents
Index.html is responsible for running the bundles that containn the charting files

### webpack.config.js
Runs when the build script is called
Responsible for creating the build folder that contains the charting files and schichart2d.data and scichart2d.wasm which are essential for charting with SciChart

### chart.js, scatterChart.js and columnChart.js
Collects the appropriate data from index.js and creates charts in their respective divs in index.html
