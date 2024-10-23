console.log(global); 
// global object(no window in nodeJS) 
// contain setInterval,setTimeout, fetch,clearTimeout (browser engine support automatically)

console.log(__dirname); // path to current directory
console.log(__filename); // path to current file
console.log(path.basename(__filename)); //<A.js> name of current file


