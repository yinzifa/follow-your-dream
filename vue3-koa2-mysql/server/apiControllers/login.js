const svgCaptcha = require('svg-captcha')

let getAuthCode = async (ctx,next)=> {
    next()
    const captcha = svgCaptcha.create({
        size: 4, //验证码长度
        fontSize: 45, //验证码字号
        noise: 1, //干扰线条数目
        width: 90, //宽度
        height: 40, //高度
        color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
        background: '#ccc' //beijing
    })
    ctx.state.code = captcha.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data  //文件返回通过ctx.body
}
let login = async(ctx,next)=> {
    next()
    ctx.status = 200;
    ctx.body = {
        status: 1,
        msg: "登录成功"
    }
}
module.exports = {
    "GET/authCode": getAuthCode,
    "POST/login": login
}
