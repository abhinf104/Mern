const fs = require('fs');
for (let i = 0; i < 100000; i++) {
    fs.writeFileSync('./data.txt', 'Hello World!',{flag:'a'});
}
console.log('Done');

const stats = fs.statSync('./data.txt');
console.log(`File size: ${stats.size/1024} bytes`);