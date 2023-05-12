const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const domain = process.env.MARKETING_SITE_NAME;


const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name][contenthash].js',
        publicPath: '/container'
    },
    plugins:[
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]

}

module.exports = merge(commonConfig, prodConfig);