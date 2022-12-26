const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        PORTAL_API_URL: JSON.stringify(process.env.PORTAL_API_URL),
        AUTH_API_URL: JSON.stringify(process.env.AUTH_API_URL),
        USER_API_URL: JSON.stringify(process.env.USER_API_URL),
        DIAGNOSTIC_API_URL: JSON.stringify(process.env.DIAGNOSTIC_API_URL),
        ASSET_API_URL: JSON.stringify(process.env.ASSET_API_URL),
        REPORT_API_URL: JSON.stringify(process.env.REPORT_API_URL),
        PRICING_API_URL: JSON.stringify(process.env.PRICING_API_URL),
        NOTIFICATION_API_URL: JSON.stringify(process.env.NOTIFICATION_API_URL),
        ENCRYPT_KEY: JSON.stringify(process.env.ENCRYPT_KEY),
      },
    }),
  ],
}
