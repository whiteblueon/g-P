<template>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%"
  >
    <el-table-column
      v-for="(titleItem, index) in titleList"
      :key="index"
      :prop="propName[index]"
      :label="titleItem"
    />
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    titleList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      propName: ['time', 'first', 'second']
    }
  }
}
</script>
