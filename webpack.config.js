const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

console.log("Building for production");

module.exports = {
    mode: "production",
    entry: {
        lineChart: "./src/chart.js",
        scatterChart: "./src/scatterChart.js",
        columnChart: "./src/columnChart.js",
    },
    module: {
        rules: []
    },
    resolve: {
        extensions: [".js"],
        fallback: {  // Disable polyfills for Node.js core modules
            "fs": false,
            "path": false
        }
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "./"
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/index.html", to: "" },
                { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
                { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" }
            ]
        })
    ]
};