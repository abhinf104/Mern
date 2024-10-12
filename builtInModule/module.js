console.log(module) // module object in each file - all exports,paths,path(for finding node modules used),filename


function add2(a){
    return a+2;
} 


const localVar = 'available locally only';
const var1 = 1;
const var2 = 2;

module.exports.add2 = add2; // add2 as function  added to module.exports
console.log(module.exports)

// overwrite module.exports
module.exports = {name2:'Suraj2', var4:4,var1,var2,add2} //one liner exporting 
console.log(module.exports) // { name2: 'Suraj2', var4: 4, var1: 1, var2: 2 }

// module.paths - array of path to node modules(all ext modules used using require is searched) -- node module resolution algorithm
console.log(module.paths)
