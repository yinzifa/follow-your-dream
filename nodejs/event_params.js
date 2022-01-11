const EventEmitter = require('events');

class CustomEvent extends EventEmitter {}

const ce = new CustomEvent();
ce.on('error',(err)=> {
    console.log(err)
});
ce.emit('error',{message:'错误',time:Date.now()})
