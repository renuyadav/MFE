const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const path = require('path');

const domain = process.env.PROD_DOMAIN;

console.log("domain name in marketing config>>", `${domain}`);

const prodConfig = {
    mode: 'production',
    output: {
        filename:'[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/marketing/',
    },
    plugins:[
       new ModuleFederationPlugin({
        name: 'marketing',
        filename: 'remoteEntry.js',
        exposes:{
            './MarketingApp': './src/bootstrap',
        }
       }) 
    ]

}

module.exports = merge(commonConfig, prodConfig);