const fs = require('fs');
console.log(fs)

const numPath = [];
console.log(`Default path: ${module.paths}`);

module.paths = numPath;
console.log(`After path: ${module.paths}`);
