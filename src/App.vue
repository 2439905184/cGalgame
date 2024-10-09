<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<script>
//点击出现文字效果
// (function() {
//     var coreSocialistValues = ["♡"]
//       , index = Math.floor(Math.random() * coreSocialistValues.length);
//         document.body.addEventListener('click', function(e) {
//         if (e.target.tagName == 'A') {
//             return;
//         }
//         var x = e.pageX + 20
//           , y = e.pageY
//           , span = document.createElement('span');
//         span.textContent = coreSocialistValues[index];
//         index = (index + 1) % coreSocialistValues.length;//取模循环
//         let randColor = getRandomColor();
//         span.style.cssText = ['z-index: 999; position: absolute; font-weight: bold; color: '+randColor+'; top: ', y - 40, 'px; left: ', x, 'px;font-size: 30px'].join('');
//         document.body.appendChild(span);
//         textAnimate(span);
//     });

//     function getRandomColor() {
//       var letters = '0123456789ABCDEF';
//       var color = '#';
//       for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//       }
//       return color;
//     }

//     function textAnimate(el) {//文字效果动画
//         var i = 0
//           , top = parseInt(el.style.top)
//           , id = setInterval(frame, 24);
//         function frame() {//帧
//             if (i > 180) {
//                 clearInterval(id);
//                 el.parentNode.removeChild(el);
//             } else {
//                 i += 2;
//                 el.style.top = top - i + 'px';
//                 el.style.opacity = (180 - i) / 180;
//             }
//         }
//     }
// }());

//取消右键
document.body.onselectstart =
document.body.oncontextmenu =
function () {
    return false; //取消浏览器默认操作
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* cursor: pointer; */
  user-select: none;
  cursor: url("./assets/cursor.png"), pointer;
  -webkit-tap-highlight-color: transparent;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-dialog {
    background-color: rgba(255, 255, 255, 0.9) !important;
    overflow: auto !important;
}

.loadingImageBox {
  background: repeating-linear-gradient(126deg, #98C2F4, #98C2F4 25px, #6593f6 25px, #6593f6 50px);
}

.content {
  height: 100vh;
  position: relative;
}

@font-face {
    font-family: 'XiangJiaoDaJiangJunLingGanTi';
    src: url('@/assets/ttf/XiangJiaoDaJiangJunLingGanTi-2.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
</style>