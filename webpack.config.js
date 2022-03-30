const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";




const rulesForJavaScript = {
   test: /\.m?js$/,
   exclude: /node_modules/,
   use: {
      loader: "babel-loader",
      options: {
         presets: [
            '@babel/preset-env', 
            ['@babel/preset-react', 
               {
                  runtime: 'automatic' // 'classic'
               }
            ]
            
         ],
         plugins: []
      }
   }

}

const rulesForStyles = {
   test: /\.s?css$/i,
   use: [
      // { loader: "style-loader" },
      { loader: MiniCssExtractPlugin.loader },
      {
         loader: "css-loader",
         options: {
            modules: true,
            import: true,
         },
      },
      // {loader: "postcss-loader"},
      {
         loader: "sass-loader"
      }
   ],
};


const developmentPlugins = [
   new MiniCssExtractPlugin({
      filename:'[name].css',
      ignoreOrder: false
   })
];

const productionPlugins = [
   new MiniCssExtractPlugin({
      filename:'[name].[fullhash].css',
      ignoreOrder: false
   })
];

// Webpack config 5
module.exports = (env, { mode }) => ({
   mode: mode,
   target:target,
   entry: {
      main: "./src/index.js",
   },
   output: {
      path: path.resolve(__dirname, './dist'),      
      filename: mode === 'production' ? '[name].[contenthash].js' : '[name].dev.js' ,
            
      },
   // target: ["web", "es5"],
   module: {
      rules: [ rulesForJavaScript, rulesForStyles ]
   },
   plugins: [

      ...( mode === 'production' ? productionPlugins : developmentPlugins ),  
      
      //defaults plugins
      new HtmlWebpackPlugin({
         template: 'src/index.html'
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
         patterns: [
            { from: "src/assets", to: "assets/" }
         ]
      }),
  

   ],
   // devtool: "inline-source-map",
   devtool: "source-map",
   devServer: {
      static: path.resolve(__dirname, "./dist"),
      compress: true,
      hot: true,     
      port: 8000,
      open: true,
      liveReload: true,
      watchFiles: ['src/**/*'],
   },


})



