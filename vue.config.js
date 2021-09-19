const configWebPack = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://learn.huuhait.me',
        secure: false,
        ws: true,
        changeOrigin: true,
        onError(err) {
          console.log('Suppressing WDS proxy upgrade error:', err);
        },
      },
    },
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    disableHostCheck: true,
  },

};

module.exports = configWebPack;
