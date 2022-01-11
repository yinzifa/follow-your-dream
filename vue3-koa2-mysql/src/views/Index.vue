<template>
  <div class="showFace">
    <div class="li" v-for="(item, index) in imgs" :key="index" >
      <span class="faceImg" v-html="item.text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      imgs: [
        {src: '/static/Emotion/weixiao.png', code: '[wx]',text:"🙂",reg:/\[wx\]/g},
        {src: '/static/Emotion/daxiao.png', code: '[dx]',text:"😄",reg:/\[dx\]/g},
        {src: '/static/Emotion/tiaopi.png', code: '[tp]',text:"😜",reg:/\[tp\]/g},
        {src: '/static/Emotion/se.png', code: '[se]',text:"😍",reg:/\[se\]/g},
        {src: '/static/Emotion/haixiu.png', code: '[hx]',text:"😳",reg:/\[hx\]/g},
        {src: '/static/Emotion/piezui.png', code: '[pz]',text:"😖",reg:/\[pz\]/g},
        {src: '/static/Emotion/fadai.png', code: '[fd]',text:"🙄",reg:/\[fd\]/g},
        {src: '/static/Emotion/yiwen.png', code: '[yw]',text:"🤔",reg:/\[yw\]/g},
        {src: '/static/Emotion/bizui.png', code: '[bz]',text:"🤐",reg:/\[bz\]/g},
        {src: '/static/Emotion/nanguo.png', code: '[ng]',text:"☹️",reg:/\[ng\]/g},
        {src: '/static/Emotion/liulei.png', code: '[ll]',text:"😢",reg:/\[ll\]/g},
        {src: '/static/Emotion/daku.png', code: '[dk]',text:"😭",reg:/\[dk\]/g},
        {src: '/static/Emotion/jingya.png', code: '[jy]',text:"😲",reg:/\[jy\]/g},
        {src: '/static/Emotion/deyi.png', code: '[dy]',text:"😏",reg:/\[dy\]/g},
        {src: '/static/Emotion/liuhan.png', code: '[lh]',text:"😓",reg:/\[lh\]/g},
        {src: '/static/Emotion/ganga.png', code: '[gg]',text:"😒",reg:/\[gg\]/g},
        {src: '/static/Emotion/zhiyi.png', code: '[zy]',text:"😐",reg:/\[zy\]/g},
        {src: '/static/Emotion/shui.png', code: '[s]',text:"😴",reg:/\[s\]/g},
        {src: '/static/Emotion/kun.png', code: '[k]',text:"😫",reg:/\[k\]/g},
        {src: '/static/Emotion/jingkong.png', code: '[jk]',text:"😱",reg:/\[jk\]/g},
        {src: '/static/Emotion/fanu.png', code: '[fn]',text:"😡",reg:/\[fn\]/g},
        {src: '/static/Emotion/meigui.png', code: '[mg]',text:"🌹",reg:/\[mg\]/g},
        {src: '/static/Emotion/zuicun.png', code: '[zc]',text:"💋",reg:/\[zc\]/g},
        {src: '/static/Emotion/aixin.png', code: '[ax]',text:"❤️",reg:/\[ax\]/g},
      ],
    }
  }
}
</script>

<style scoped>
.showFace {
  height: 200px;
  padding: 15px 15px 0 15px;
  overflow: hidden;
  width: 290px;
  margin: 0 auto;
  box-sizing: border-box;
}
.showFace .li {
  float: left;
  padding: 0 10px 0 6px;
}
.faceImg {
  display: inline-block;
  text-align: center;
  width: 26px;
  height: 26px;
}
</style>
