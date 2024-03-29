const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const path = require('path');

const domain = process.env.PROD_DOMAIN;

console.log("domain name in container config>>", domain);

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name][contenthash].js',
        path: path.resolve(__dirname, '../dist/container'), //it will create container folder inside dist
        publicPath: '/container/', //files will be accessed from /container path
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}marketing/remoteEntry.js`,
                auth: 'auth@http://localhost:8082/remoteEntry.js'
            },
            shared: packageJson.dependencies
        })
    ]

}

module.exports = merge(commonConfig, prodConfig);