

const vueRule = {
  test: /\.vue$/,
  loader: 'vue-loader',
};

const jsRule={
  test: /\.js$/,
  loader: 'babel-loader',
};

const cssRule={
  test:/\.css$/,
  loader:['vue-style-loader','css-loader'],
};

const imageRule={
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: 'img/[name].[hash:7].[ext]'
  }
};
module.exports = {
  module:{
    rules:[vueRule,jsRule,cssRule,imageRule]
  },
}