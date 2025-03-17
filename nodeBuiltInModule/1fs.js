const fs = require("fs");
const path = require("path");
const os = require("os");

// const 1module = require('./1module'); // importing module object from 1module.js
// console.log(1module)
// const {add2,var1,var2} = module; // importing add2, var1, var2 from 1module.js by destructuring

// 4 common methods in fs  -> readFilesync, writeFileSync, readFile, writeFile

// readFile
const data1 = fs.readFileSync("./data.txt"); // reading without encoding Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
const data2 = fs.readFileSync("./data.txt", "utf-8"); // reading with encoding utf-8 Hello World!

// console.log(`Without Encoding:`, data1,"\n",`With Encoding:`, data2);

fs.writeFileSync("./data.txt", "Hello World!");
//writeFileSync --> sync fnx --> takes 2 args: path, data
// writeFile --> async fnx --> takes 3 args: path, data, callback
fs.writeFile("./data.txt", "Hello World2!", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File written successfully");
  }
});

//readFileSync --> sync fnx --> takes 2 args: path, encoding
// readFile --> async fnx --> takes 3 args: path,encoding, callback
fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("File read successfully:", data);
  }
});

//fs.writeFile('./data.txt', 'Hello World!\n', { flag: 'a' }, (err) => {})
// avoiding overwriting in writeFile --> fs.appendFile
// using {flag:'a'} with fs.writeFile --> append
//
