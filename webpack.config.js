var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		index: './build.js'
	},
	output: {
		path: __dirname + '/public/javascripts/',
		filename: 'build.min.js'
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			loaders: ['jsx', 'babel?presets[]=react,presets[]=es2015'],
			exclude: /node_modules/
		},
		{
			test:/\.scss$/,
			loader:ExtractTextPlugin.extract('style','css!postcss!sass')
		}]
	},
	postcss:function(){
		return [require('autoprefixer'),require('precss')];
	},
	plugins:[
		new ExtractTextPlugin('../stylesheets/all.css')
	]
}