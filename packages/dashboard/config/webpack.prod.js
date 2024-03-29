const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');
const path = require('path');

const domain = process.env.PROD_DOMAIN;

console.log("domain name in dashboard config>>", domain);

const prodConfig = {
  mode: 'production',
  output: {
    filename:'[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/dashboard'),
    publicPath: `${domain}/dashboard/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
