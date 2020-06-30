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
        path: "/mnt/c/Users/JJ/AppData/Local/Screeps/scripts/127_0_0_1___21025/default",
        library: "main",
        libraryTarget: "commonjs2",
    },
    devtool: "source-map",
    optimization: {
        minimize: false,
    },
};
