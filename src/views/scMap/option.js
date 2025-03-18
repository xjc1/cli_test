import * as echarts from 'echarts';
// 引入echarts
const series = [
  {
    type: 'map',
    map: 'sichuan',
    tooltip: {
      show: false,
    },
    label: {
      show: true,
      color: '#00277B',
      fontSize: 12,
      formatter: (params = {}) => params.data?.properties?.fullname || params.name,
    },
    aspectScale: 0.75,
    layoutCenter: ['49%', '50%'], // 地图位置
    layoutSize: '100%',
    itemStyle: {
      borderColor: '#7ea7ff',
      borderWidth: 1,
      areaColor: 'trasparent',
    },
    emphasis: {
      label: {
        show: true,
        color: '#fff',
        fontSize: 12,
        fontWeight: 400,
      },
      // 鼠标放上去后，样式改变
      itemStyle: {
        // 图形的描边颜色
        borderColor: '#7ea7ff',
        borderWidth: '1',
        // 阴影色
        areaColor: '#7ea7ff',
      },
    },
  },
];
const option = {
  width: '543px',
  height: '520px',
  geo: {
    map: 'sichuan',
    type: 'map',
    roam: false,
    label: {
      show: false,
    },
    layoutCenter: ['50%', '50%'], // 地图位置
    layoutSize: '100%',
    // tooltip: { // 设置鼠标移至城市板块选中视图配置选项
    //   backgroundColor: '#ffffff', // 设置地图高亮时城市视图背景色框
    //   borderRadius: 0,
    //   trigger: 'item',
    // },
    itemStyle: {
      borderColor: '#c4d4ff',
      borderWidth: 1,
      areaColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: 'red' },
        { offset: 1, color: 'black' },
        // { offset: 1, color: '#dde4fd' },
      ]),
    },
    emphasis: {
      disabled: true,
    },
  },
  series,
};

export default option;
