<template>
  <div class="tableMerge">
   <h3>表格合并</h3>
    <div>
      <el-table
        :data="resultList"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="amount1" label="Amount 1" />
        <el-table-column prop="amount2" label="Amount 2" />
        <el-table-column prop="amount3" label="Amount 3" />
      </el-table>
    </div>
  </div>
</template>
<script setup>

const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}) => {
  if (columnIndex === 1) {
    if (row.mergeRowSpan) {
      return {
        rowspan: row.mergeRowSpan,
        colspan: 1,
      };
    }
    return {
      rowspan: 0,
      colspan: 0,
    };
  }
};

const tableData = [
  {
    id: '129871221',
    name: 'Tom1',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
  },
  {
    id: '129871232',
    name: 'Tom1',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
  },
  {
    id: '129871243',
    name: 'Tom2',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
  },
  {
    id: '129871254',
    name: 'Tom2',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
  },
  {
    id: '129871265',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
  {
    id: '129871266',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
  {
    id: '129871267',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
  {
    id: '129871268',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
  {
    id: '1298712689',
    name: 'TomTest',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
];

const mergeTableListByName = (list) => list.reduce((prev, curr, index) => {
  const lastRow = index === 0 ? {} : prev[prev.length - 1];
  if (curr.name === lastRow.name) {
    lastRow.mergeRowSpan += 1;
    return prev;
  }
  return [...prev, {
    ...curr,
    mergeRowSpan: 1,
  }];
}, []);

const mergeTableList = mergeTableListByName(tableData);
const resultList = tableData.map((item) => {
  const aim = mergeTableList.find((row) => row.id === item.id) || {};
  if (aim.id) {
    return {
      ...item,
      mergeRowSpan: aim.mergeRowSpan,
    };
  }
  return item;
});
console.log('mergeTableList', resultList);

defineOptions({
  name: 'TableMerge',
});
</script>

<style lang="scss" scoped>
.tableMerge {
}
</style>
