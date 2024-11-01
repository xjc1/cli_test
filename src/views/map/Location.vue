<template>
  <div class="Location">
    <h3>高德地图-获取定位</h3>
    <div id="container"></div>
    <div class="info">
      <h4 id="status"></h4><hr>
      <p id="result"></p><hr>
      <p >由于众多浏览器已不再支持非安全域的定位请求，为保位成功率和精度，请升级您的站点到HTTPS。</p>
    </div>
  </div>
</template>
<script>
// 解析定位结果
function onComplete(data) {
  document.getElementById('status').innerHTML = '定位成功';
  const str = [];
  str.push(`定位结果：${data.position}`);
  str.push(`定位类别：${data.location_type}`);
  /* str.push('详细位置：' + data.formattedAddress); */
  const position_de = data.formattedAddress;
  const position_ie = data.formattedAddress;
  console.log('position_ie', position_ie);
  str.push(`位置：${position_de}`);
  str.push(`详细信息：${data.message}`);
  if (data.accuracy) {
    str.push(`精度：${data.accuracy} 米`);
  }// 如为IP精确定位结果则没有精度信息
  str.push(`是否经过偏移：${data.isConverted ? '是' : '否'}`);
  document.getElementById('result').innerHTML = str.join('<br>');
}
// 解析定位错误信息
function onError(data) {
  document.getElementById('status').innerHTML = '定位失败';
  document.getElementById('result').innerHTML = `失败原因排查信息:${data.message}`;
}

export default {
  name: 'Location',
  mounted() {
    const map = new AMap.Map('container', {
      resizeEnable: true,
    });
    AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', // 定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, // 定位成功后是否自动调整地图视野到定位点
        needAddress: true,

      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          onComplete(result);
          console.log(result);
        } else {
          onError(result);
        }
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.Location {
  .info{
    width:26rem;
  }
}

#container{
  height:90vh;
}
</style>
