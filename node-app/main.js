#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var program = require('commander');
var child_process = require('child_process');
var ColouredProse  = require('coloured-prose');
program
  .version('0.1')
  .usage('')
  .parse(process.argv)

var args = program.args;

var sourceDir = '/sources/';
var targetDir = '/output/';

var vowels = 'a,e,y,u,i,o'.split(',');


console.info("Starting the app...");

var files = fs.readdirSync(__dirname + sourceDir);
var colouredProse = new ColouredProse("a,e,y,i,u,o".split(","));

files.forEach(function(file) {
  // only read plain/text .txt files:
  if(/.txt$/.test(file)){

    fs.readFile(__dirname + sourceDir + file, 'utf8', function(err, data) {
      if(err){
        console.error(err);
        return;
      }
      colouredProse.processText(data);
      var sylJson =  JSON.stringify(colouredProse.syllabelisedText);
      var colouredJson =  JSON.stringify(colouredProse.colourisedText);
      var fileName = file.replace('.txt','').replace(/\s/g, '_');
      fs.writeFile(__dirname + targetDir + fileName + "-syllabelised.json", sylJson);
      fs.writeFile(__dirname + targetDir + fileName + "-colourised.json", colouredJson);
    });
  }
}, this);
