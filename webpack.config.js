const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    target: "node",
    entry: "./src/main.ts",
    module: {
        rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    externals: {
        lodash: "lodash",
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "dist", to: "/mnt/c/Users/JJ/AppData/Local/Screeps/scripts/127_0_0_1___21025/default" }],
            options: {
                concurrency: 100,
            },
        }),
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        library: "main",
        libraryTarget: "commonjs2",
    },
    devtool: "source-map",
    optimization: {
        minimize: false,
    },
};
