const path = require('path');

// 1. path module -- builtin module with nodeJS
console.log(path.dirname(__filename)); // path to current directory
console.log(__filename); // path to current file
console.log(path.basename(__filename)); // name of current file
console.log(path.sep); // seperator
console.log(path.delimiter); // delimiter
const filePath = path.join(__dirname, 'data.txt');
console.log(filePath); // path to data.txt
console.log(Object.keys(path)); // all methods in path
