const path = require('path');
const { HtmlRspackPlugin } = require('@rspack/core');

module.exports = {
  // Define o ponto de entrada
  entry: './src/index.tsx',
  // Saída do bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlRspackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      // Processamento dos arquivos TypeScript/TSX
      {
        test: /\.[jt]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      // Processamento do CSS (incluindo Tailwind via PostCSS)
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      // Processamento de imagens (opcional)
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 3000,
    open: true,
  },
  mode: 'development',
};
