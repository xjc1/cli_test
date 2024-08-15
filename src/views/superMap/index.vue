<template>
  <div class="superMap">
    <h3>超图</h3>
    <div id="map" style="position:absolute;left:0px;right:0px;width:800px;height:500px;"></div>
  </div>
</template>
<script setup>
import L from 'leaflet';
import { TiledMapLayer } from '@supermapgis/iclient-leaflet';
import { defineOptions, onMounted } from 'vue';

defineOptions({
  name: 'SuperMap',
});
onMounted(() => {
  const url = 'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World';
  const map = L.map('map', {
    crs: L.CRS.EPSG4326,
    center: [0, 0],
    maxZoom: 18,
    zoom: 1,
  });
  new TiledMapLayer(url).addTo(map);
});
</script>

<style lang="scss" scoped>
.superMap {
}
</style>
