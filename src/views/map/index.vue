<template>
  <div class="map">
   <h3>高德地图</h3>
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>
<script>
export default {
  name: 'Map',
  mounted() {
    // 基本地图加载
    const map = new AMap.Map('container', {
      resizeEnable: true,
      center: [116.397428, 39.90923], // 地图中心点
      zoom: 13, // 地图显示的缩放级别
    });
    // 构造路线导航类
    const driving = new AMap.Driving({
      map,
      panel: 'panel',
    });
    // 根据起终点名称规划驾车导航路线
    driving.search([
      { keyword: '北京市地震局(公交站)', city: '北京' },
      { keyword: '亦庄文化园(地铁站)', city: '北京' },
    ], (status, result) => {
      // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      if (status === 'complete') {
        console.log('绘制驾车路线完成');
      } else {
        console.log(`获取驾车数据失败：${result}`);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.map {
  #container {
    height: 60vh;
    width: 100%;
  }

  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
}
</style>
