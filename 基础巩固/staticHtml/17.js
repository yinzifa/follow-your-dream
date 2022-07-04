console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    });
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5');
    });
});

process.nextTick(function() {
    console.log('6');
});

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8');
});

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    });
})

/*答案

1、7、6、8、2、4、9、11、3、10、5、12

解析

这道题和上一题差不多，但是出现了process.nextTick，所以显然是在node环境下，
node也存在事件循环的概念，但是和浏览器的有点不一样，nodejs中的宏任务被分成了几种不同的阶段，两个定时器属于timers阶段，
setImmediate属于check阶段，socket的关闭事件属于close callbacks阶段，其他所有的宏任务都属于poll阶段，
除此之外，只要执行到前面说的某个阶段，那么会执行完该阶段所有的任务，这一点和浏览器不一样，浏览器是每次取一个宏任务出来执行，
执行完后就跑去检查微任务队列了，但是nodejs是来都来了，一次全部执行完该阶段的任务好了，那么process.nextTick和微任务在什么阶段执行呢，
在前面说的每个阶段的后面都会执行，但是process.nextTick会优先于微任务。理解了以后再来分析这道题就很简单了，首先执行整体代码，
先打印出1，setTimeout回调扔进timers队列，nextTick的扔进nextTick的队列，promise的回调是同步代码，执行后打印出7，
then回调扔进微任务队列，然后又是一个setTimeout回调扔进timers队列，到这里当前节点就结束了，
检查nextTick和微任务队列，nextTick队列有任务，执行后打印出6，微任务队列也有，打印出8，接下来按顺序检查各个阶段，
check队列、close callbacks队列都没有任务，到了timers阶段，发现有两个任务，先执行第一个，
打印出2，然后nextTick的扔进nextTick的队列，执行promise打印出4，then回调扔进微任务队列，再执行第二个setTimeout的回调，
打印出9，然后和刚才一样，nextTick的扔进nextTick的队列，执行promise打印出11，then回调扔进微任务队列，到这里timers阶段也结束了，
执行nextTick队列的任务，发现又两个任务，依次执行，打印出3和10，然后检查微任务队列，也是两个任务，依次执行，打印出5和12，到这里是有队列都清空了。
*
* */