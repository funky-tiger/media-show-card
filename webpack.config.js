const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "./example/src/index.html"),
  filename: "./index.html"
});

module.exports = {
  entry: path.join(__dirname, "./example/src/index.tsx"),
  output: {
    path: path.join(__dirname, "example/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: "ts-loader"
      },
      {
        // pre/nomal/post - loader的执行顺序 - 前/中/后
        enforce: "pre",
        test: /\.tsx?/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|mp4)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 20
          }
        }
      }
    ]
  },
  //映射工具
  devtool: "source-map", //源代码和打包文件的映射
  //处理路径解析
  resolve: {
    //extensions 拓展名
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"]
  },
  plugins: [htmlWebpackPlugin],
  devServer: {
    port: 3001
  }
};
