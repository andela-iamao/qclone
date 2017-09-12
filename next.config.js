module.exports = {
  webpack: (config) => {
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
