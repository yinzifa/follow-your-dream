var x=1
switch(x++)
{
    case 0: {
        ++x;
        console.log("case0")
    }
    case 1: {
        console.log(x)
        ++x;
        console.log("case1")
        // break;
    }
    case 2: {
        ++x;
        console.log("case2")
    }
}
console.log(x)

/*答案

4

解析

这题考查的是自增运算符的前缀版和后缀版，以及switch的语法，后缀版的自增运算符会在语句被求值后才发生，
所以x会仍以1的值去匹配case分支，那么显然匹配到为1的分支，此时，x++生效，x变成2，再执行++x，变成3，
因为没有break语句，所以会进入当前case后面的分支，所以再次++x，最终变成4。
* */