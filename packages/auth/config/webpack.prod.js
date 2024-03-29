const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const path = require('path');

const domain = process.env.PROD_DOMAIN;

console.log("domain name in auth config>>", `${domain}`);

const prodConfig = {
    mode: 'production',
    output: {
        filename:'[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist/auth'),
        publicPath: `${domain}/auth/`,
    },
    plugins:[
       new ModuleFederationPlugin({
        name: 'auth',
        filename: 'remoteEntry.js',
        exposes:{
            './authApp': './src/bootstrap',
        },
        shared: packageJson.dependencies
       }) 
    ]

}

module.exports = merge(commonConfig, prodConfig);