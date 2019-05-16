<template>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      :label="titleList[0]"
    />
    <el-table-column
      prop="one"
      :label="titleList[1]"
    />
    <el-table-column
      prop="two"
      :label="titleList[2]"
    />
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    titleList: {
      type: Array
    }
  }
}
</script>
