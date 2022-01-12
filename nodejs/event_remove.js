const EventEmitter = require('events');
class CustomEvent extends EventEmitter {}

const ce = new CustomEvent();

function fn1() {
    console.log("fn1")
}
function fn2() {
    console.log("fn2")
}

ce.on("test",fn1)
ce.on("test",fn2)

setInterval(()=> {
    ce.emit('test')
},1000)
setTimeout(()=> {
    // ce.removeListener("test",fn2)
    // ce.removeListener("test",fn1)
    ce.removeAllListeners('test')
},3000)

