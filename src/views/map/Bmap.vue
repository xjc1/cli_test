<template>
  <div class="Bmap">
    <h3>百度地图-获取定位</h3>
    <div id="container"></div>
  </div>
</template>
<script>
export default {
  name: 'Bmap',
  mounted() {
    const map = new BMapGL.Map('container');
    const point = new BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
    // const marker = new BMapGL.Marker(point); // 创建标注
    // map.addOverlay(marker);
    // 创建定位控件
    const geolocation = new BMapGL.Geolocation();
    console.log('BMAP_STATUS_SUCCESS', BMAP_STATUS_SUCCESS);
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        console.log('r', r);
        const mk = new BMapGL.Marker(r.point, { title: 'titlejjjjjjjj' });
        map.addOverlay(mk);
        map.panTo(r.point);
        alert(`您的位置：${r.point.lng},${r.point.lat}`);
      } else {
        alert(`failed${this.getStatus()}`);
      }
    }, () => {}, { enableHighAccuracy: true });
  },
};
</script>

<style lang="scss" scoped>
.Bmap {
}
#container{
  height:90vh;
}
</style>
