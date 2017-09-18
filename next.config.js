module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins.filter((plugin) => {
      if (plugin.constructor.name === 'UglifyJsPlugin') {
        return false;
      } else {
        return true;
      }
    });

    config.module.rules.push(
      {
        test: /\.css$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/stylesheet.csss',
        },
      },
      {
        test: /\.css$/,
        // Example with `css-loader` and `sass-loader'
        loader: 'babel-loader!next-style-loader!css-loader?sourceMap&minimize=${!dev}&url=false!sass-loader',
      }
    );

    return config;
  },
};
