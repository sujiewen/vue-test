<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <div>
<!--      <muti-lang-base-grid-component-->
<!--            :titles="gridTitles"-->
<!--            :data="processGridData()">-->
<!--      </muti-lang-base-grid-component>-->
      <el-table
              :data="tableData"
              border
              style="width: 100%">
        <el-table-column
                fixed
                prop="date"
                label="日期"
                width="150">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="120">
        </el-table-column>
        <el-table-column
                prop="province"
                label="省份"
                width="120">
        </el-table-column>
        <el-table-column
                prop="city"
                label="市区"
                width="120">
        </el-table-column>
        <el-table-column
                label="地址"
                width="300">
          <template slot-scope="scope">
            <div v-html="scope.row.address"></div>
          </template>

        </el-table-column>
        <el-table-column
                prop="zip"
                label="邮编"
                width="120">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

// import MutiLangBaseGridComponent from '../components/MutiLangBaseGridComponent'

export default {
  name: 'HelloWorld',
  components: {
    // MutiLangBaseGridComponent
  },
  data () {
    return {
      gridTitles: [
        '2342324234',
        '23423432324324',
        '55465565',
        '554655651',
        '554655652',
        '554655653'
      ],
      actions: [
        {
          name: '234234432423',
          action: 'onWaybillOption'
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄<br /><nobr>上海市普陀区金沙江路 海市普陀区金沙江海市普陀区金沙江海市普陀区金沙江海市普陀区金沙江1518 弄</nobr><br/>上海市普陀区金沙江路 1517 弄23224234',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  props: {
    msg: String
  },
  methods: {
    onIndexChange (rowIndex, checked) {
      // let isExist = false
      // let currentIndex = -1
    },
    processGridData () {
      let gridData = []
      let ele = {
        paymentTypeAccountNameBankAccountType: 1,
        targetAccountAccountOwnerAccountOwnerAddress: 2,
        needPaymentMoney: 3,
        leftPaymentMoney: 4,
        seriesNumber: 'sdfsdfsadfdadfafdafdfdadfdfdfafddafafdfddafafdfadfafdfda',
        paymentMoney: 'sdfsdfsadfdadfafdafdfdadfdfdfafddafafdfddafafdfadfafdfda'
      }
      gridData.push(ele)
      return gridData
    },
    onTableActions (actionIndex, rowIndex) {
      console.log(actionIndex + ' === ' + rowIndex)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.upload-list{margin:0;padding:0;list-style:none;}
.upload-list-li{position: relative;margin-top:5px;line-height: 1.8}
.upload-list-li:hover{background-color: #f5f7fa;}
.upload-list-li-name{position:relative;margin-right: 40px;display: block;}
.fa-file-text-o{margin-right:7px;}
.upload-list-li-label{position:absolute;right:5px;top:0;}
.file-box{
  padding:5px 15px;
  border-radius:3px;
  background-color:#409eff;
  border-color:#409eff;
  color:#000;display:inline-block;position: relative;
}
.file-btn{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: none;
  background-color: transparent;
  filter:alpha(opacity=0);
  -moz-opacity:0;
  -khtml-opacity: 0;
  opacity: 0;
}

</style>
