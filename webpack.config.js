const path = require("path");

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
