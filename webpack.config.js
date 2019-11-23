const path = require(`path`);
const PATH_TO_PUBLIC = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: PATH_TO_PUBLIC
  },
  devtool: `source-map`,
  devServer: {
    contentBase: PATH_TO_PUBLIC,
    watchContentBase: true
  }
};
