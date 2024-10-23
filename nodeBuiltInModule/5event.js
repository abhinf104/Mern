const events = require('events');

const eventEmitter = new events.EventEmitter();

eventEmitter.on("click",(name,id)=>{
    console.log("1st clicked event occurred"+"  "+name+" "+id)
}
)
eventEmitter.emit("click","hello",9)
eventEmitter.on("click",(name,id)=>{
    console.log("2nd clicked event occurred"+"  "+name+" "+id)
})