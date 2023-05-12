const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const domain = process.env.PROD_DOMAIN;

console.log("domain name in container config>>", domain);

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name][contenthash].js',
        publicPath: ''
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]

}

module.exports = merge(commonConfig, prodConfig);