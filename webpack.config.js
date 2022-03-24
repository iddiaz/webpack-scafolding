const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');


const javaScriptRules = {
   test: /\.m?js$/,
   exclude: /node_modules/,
   use: {
      loader: "babel-loader",
      options: {
         presets: ['@babel/preset-env', '@babel/preset-react'],
         plugins: []
      }
   }
}

const rulesForCssStyles = {
   test: /\.css$/,
   use: [
      // style-loader
      { loader: "style-loader" },
      // css-loader
      {
         loader: "css-loader",
         options: {
            modules: true,
         },
      }
   ],
};
const rulesForScssStyles = {
   test: /\.s[ac]ss$/i,
   use: [
           // Creates `style` nodes from JS strings
           "style-loader",
           // Translates CSS into CommonJS
           "css-loader",
           // Compiles Sass to CSS
           "sass-loader",
         ],

};

const developmentPlugins = [];

const productionPlugins = [
   
   new copyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets/" }
      ]
    }),
   
];



// Webpack config
module.exports = (env, { mode }) => ({
   output: {
      path: path.resolve(__dirname, './dist'),      
      filename: mode === 'production' ? 'bandle.[contenthash].js' : 'bundle.dev.js' ,
      
   },
   module: {
      rules: [ javaScriptRules, rulesForCssStyles, rulesForScssStyles ] 
   },


   plugins: [

      ...( mode === 'production' ? productionPlugins : developmentPlugins ),  
      
      //defaults plugins
      new HtmlWebpackPlugin({
         template: 'src/index.html'
      }) 

   ].filter(Boolean)
      
})