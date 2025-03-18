<template>
  <div class="EMap">
    <h3>EMap</h3>
    <div id="sichuan" class="mapLayout" ref="chartRef">

    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';// 引入echarts
import sichuanJson from './sichuan';
import province from './province';
import option from './option';
import {ref, onMounted,watch} from 'vue';
const props = defineProps({
  id: {
    type: String,
    default:'sichuan'
  }, //组件地图id
  list: {
    type: Array,
    default:[]
  } //城市散点图列表数据
})
// 引入四川省geoJson数据(也可通过服务器接口获取)
echarts.registerMap('sichuan', sichuanJson); // 注册绘制四川省地图
const chartRef = ref(null);
onMounted(() => {
  chartRef.value = echarts.init(document.getElementById(props.id));//实力化对象
  const {features} = province;
  option.series[0].data =  features.map(feature => ({
    name: feature.properties.name, // 绑定 name 字段
    value: feature.properties.code, // value
    properties: feature.properties // 绑定 properties
  }));
  // option.series[1].data = features[2];
  // option.series[2].data = features[3];
  chartRef.value?.setOption(option);
});

</script>
<script>
export default {
  name: 'EMap',
};
</script>

<style lang="scss" scoped>
.EMap {
  .mapLayout{
    margin: 0 auto;
    width: 543px;
    height: 520px;
    //border: 1px solid #ccc
  }
}
</style>
