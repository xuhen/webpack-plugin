const { resolve } = require("path");
const bundlesizeplugin = require("./bundlesize-webpack-plugin");

module.exports = {
    entry: resolve(__dirname, "src/index.js"),
    output: {
        path: resolve(__dirname, "bin"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /.yaml$/,
                exclude: /node_modules/,
                use: {
                    loader: resolve('./json-loader/index.js'),
                    options: {

                    }
                }
            }
        ]
    },
    mode: 'development',
    plugins: [
        new bundlesizeplugin({
            sizeLimit: 5
        })
    ]
};