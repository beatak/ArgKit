#!/usr/bin/env node

console.log(process.argv);
var argkit = require('./arg.js').argkit;
var parser = new argkit(
  ['node', 'thisfile.js', '--foo', 'pattern', 'file'], 
  {
    'optionMaybePassedAsHash': true,
    'foo': false
  }
);
parser.ignoreCase = true;





