<template>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="rank"
      :label="name[0]"
    />
    <el-table-column
      prop="country"
      :label="name[1]"
    />
    <el-table-column
      prop="distribution"
      :label="name[2]"
    />
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    name: {
      type: Array
    }
  }
}
</script>
