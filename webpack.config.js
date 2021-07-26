const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production", //ambiente de produção ou desenvolvimento
  devtool: isDevelopment ? "eval-source-map" : "source-map", //deixa exatamente o mesmo erro da aplicação
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    //assim não precisa falar o tipo de arquivo no fim na importação
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(), //pra só usar o RRWP quando for em desenvolvimento
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        //toda vez que encontrar um arquivo que termine com .jsx tu vai usar babel pra traduzir pro browser
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"), //quando muda o estado, nao atualiza tudo
            ].filter(Boolean),
          },
        },
      },
      {
        //toda vez que encontrar um arquivo que termine com .scss tu vai usar os dois em conjunto abaixo
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
