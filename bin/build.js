#! /usr/bin/env node
var path = require('path');
var metalsmith = require('metalsmith');
var express = require('metalsmith-express');
var watch = require('metalsmith-watch');
var webpack = require('ms-webpack');

var runtastic = require('../src/plugins/runtastic.js');
var config = require('../src/plugins/config.js');

var siteSrc = path.join(__dirname, '../base-website')

var ms = metalsmith(process.cwd());
ms.metadata({})
  .source(siteSrc)
  .ignore('.*')
  .destination('runtastic-dataviz')
  .use(config())
//  uncomment for DEV
//  .use(express())
//  .use(watch({
//    paths: {
//      '${source}/**/*': true,
//      '${source}/../src/components/**/*': true
//    },
//    livereload: true
//  }))
  .use(runtastic())
  .use(webpack({
    devtool: 'eval-source-map',
    context: siteSrc,
    entry: {
      main: './main.js'
    },
    output: {
      path: 'runtastic-dataviz',
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }]
    }
  }))
  .build(function(e, outputFiles){
    if(e) {
      console.error(e.stack);
    }
    else console.log('Build complete!');
  })
