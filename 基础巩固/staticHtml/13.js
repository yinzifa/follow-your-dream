const obj = {
    a: {
        a: 1
    }
};
const obj1 = {
    a: {
        b: 1
    }
};
let target = Object.assign(obj, obj1);
obj1.a.b = 3;
console.log(target.a.b)
console.log(target.a.b)
