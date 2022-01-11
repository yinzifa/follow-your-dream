const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
// const KoaStatic = require("koa-static");
// const path = require("path");
const apiController = require('./apiControler');
// require("./config/env");

let app = new Koa();
//使用bodyParser中间件，方便参数的传递
app.use(BodyParser());

//异常处理中间件
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    try {
        ctx.error = (code,msg)=> {
            ctx.throw(code||500, msg||"服务端错误")
        }
        await next();
    }catch (e) {
        let status = e.status || 500;
        let msg = e.message || "服务端错误";
        ctx.body = {
            status,
            msg
        }
    }
});


//使用路由中间件
app.use(apiController());

//设置dist目录为静态资源目录
// app.use(KoaStatic(path.join(__dirname, "../dist")));

app.listen(9999,()=> {
    console.log(`服务器启动成功:10.12.0.138:9999`);
});
