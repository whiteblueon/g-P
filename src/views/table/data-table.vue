<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="text" style="width: 240px" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="时间" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据种类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.typeText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际数据1" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.first }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际数据2" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.second }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="数据种类" prop="title">
          <el-select v-model="temp.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.text"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-input v-model="temp.time" placeholder="时间"/>
        </el-form-item>
        <el-form-item label="数据1" prop="first">
          <el-input v-model="temp.first" placeholder="数据1"/>
        </el-form-item>
        <el-form-item label="数据2" prop="second">
          <el-input v-model="temp.second" placeholder="数据2"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDataList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import axios from 'axios'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      text: null,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      datePicker: '',
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        time: null,
        type: null,
        first: null,
        second: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        timestamp: [{ type: 'date', required: true, message: '必填', trigger: 'change' }],
        first: [{ required: true, message: '必填', trigger: 'blur' }],
        second: [{ required: true, message: '必填', trigger: 'blur' }],
        time: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      downloadLoading: false,
      typeList: [],
      currentId: null,
    }
  },
  mounted() {
    // this.getList()
    this.getTypeList()
    this.getData()
  },
  methods: {
    getTypeList() {
      axios.get('http://127.0.0.1:7001/data/type').then(res => {
        this.typeList = res.data;
      })
    },
    getData() {
      axios.get('http://127.0.0.1:7001/data').then(res => {
        this.list = res.data
      })
    },
    deleteItem(id) {
      axios.delete('http://127.0.0.1:7001/data/' + id).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getData()
      })
    },
    getList() {
      this.listLoading = true
      fetchDataList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        time: null,
        type: null,
        first: null,
        second: null,
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          axios.post('http://127.0.0.1:7001/data', this.temp).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getData()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = row
      this.currentId = row.id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const { typeText, header, ...rest } = this.temp
          axios.put('http://127.0.0.1:7001/data/' + this.currentId, rest).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.getData()
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
