<template>
  <div class="grid-layout">
    <div>
      <table>
        <thead>
          <tr @click.stop="clickRowReset">
            <th></th>
            <th v-for="(key, index) in titles" :key="key" v-html="processTitle(index)" :style="{'text-align': 'left', 'padding-left': '10px', 'padding-right': '10px', 'cursor': 'pointer'}"  @click.stop="onSwitchSort(index)">
            </th>
            <th v-for="action in actions" :key=action.name></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, rowIndex) in data"
            :key="entry.name"
            :class="[{'line-bg-style': (rowIndex % 2 === 0)}]"
            :style="{'background': (colorList !== undefined) ? colorList[rowIndex] : ''}">
            <td
              class="muti-choice-td-layout"
              :class="[{'click-row-style' : mutiChoiceArr[rowIndex].checked}]"
              @click.stop="mutiChoiceItem(rowIndex)">
              <img
                v-if="isSupportMutiChoice"
                class="radio-button"
                style="z-index:1"
                :src="choiceSrc(rowIndex)">
            </td>
            <td
              v-for="(key) in columns"
              :key="key.name"
              :class="[{'click-row-style' : mutiChoiceArr[rowIndex].checked}]"
              @click.stop="singleClickItem(rowIndex, key)" v-html="processHTMLData(entry[key])"
              :style="{'text-align': 'left', 'padding-left': '10px', 'padding-right': '10px'}">
            </td>
            <td v-for="(action, index) in actions" :key=action.name
              :class="[{'click-row-style' : mutiChoiceArr[rowIndex].checked}]"
              @click.stop="onActions(index,rowIndex)"
              style="padding:0px 10px 0px 10px; color: #215cb1; cursor: pointer;">{{ $t(actions[index].name) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    // 页面名称
    titles: Array,
    // arrow信息. 0为隐藏 1为平序 2为降序  3为升序
    arrows: Array,
    // 跳转变色.
    // 指示变色index，color颜色，增加跳转...
    jumpColorList: Array,
    // 数据接口
    data: Array,
    // 是否支持多选接口
    isSupportMutiChoice: false,
    // 支持的操作
    actions: Array,
    // CheckAllComponent用来影响GridComponent的全选或全不选状态的变量
    isCheckAllToGridProp: false,
    // 变色List
    colorListProp: Array,
    // 新增Option All 同步选中状态数据.
    optionAllProp: Array
  },
  data () {
    return {
      actionChineseCharWidth: 14,
      actionButtonWidth: 86,
      actionButtonHorizonPadding: 10,
      currentClickRow: -1,
      mutiChoiceArr: [],
      GridCheckAllLocal: false,
      optionAll: []
    }
  },
  computed: {
    columns () {
      let singleColumnKeys = []
      if (this.data.length > 0) {
        for (const key in this.data[0]) {
          singleColumnKeys.push(key)
        }
      }
      return singleColumnKeys
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    processTitle (index) {
      let key = ''
      if (this.arrows === undefined) {
        key = this.$t(this.titles[index])
      } else {
        if (this.arrows[index].arrow === 0) {
          key = this.$t(this.titles[index])
        } else if (this.arrows[index].arrow === 1) {
          key = this.$t(this.titles[index]) + '▶'
        } else if (this.arrows[index].arrow === 2) {
          key = this.$t(this.titles[index]) + '▼'
        } else if (this.arrows[index].arrow === 3) {
          key = this.$t(this.titles[index]) + '▲'
        }
      }
      return key
    },
    onSwitchSort (index) {
      if ((this.arrows === undefined) || this.arrows[index].arrow === 0) {
        return
      }
      let item = 0
      if (this.arrows[index].arrow === 1) {
        item = 2
      } else if (this.arrows[index].arrow === 2) {
        item = 3
      } else if (this.arrows[index].arrow === 3) {
        item = 2
      }
      for (let i = 0; i < this.arrows.length; i++) {
        if (i === index) {
          Vue.set(this.arrows[index], 'arrow', item)
        } else {
          if (this.arrows[i].arrow !== 0) {
            Vue.set(this.arrows[i], 'arrow', 1)
          }
        }
      }
      this.$emit('on-arrow-change', index, item)
    },
    // 多选radio的状态
    choiceSrc (rowIndex) {
      if (this.mutiChoiceArr[rowIndex].checked === null) {
        return ''
      } else if (this.mutiChoiceArr[rowIndex].checked === true) {
        return require('../assets/images/radio_checked.png')
      } else if (this.mutiChoiceArr[rowIndex].checked === false) {
        return require('../assets/images/radio_unchecked.png')
      }
    },
    mutiChoiceItem (rowIndex) {
      if (this.isSupportMutiChoice === false) {
        return
      }
      let itemStatus = this.mutiChoiceArr[rowIndex].checked
      itemStatus = !itemStatus
      this.mutiChoiceArr[rowIndex].checked = itemStatus
      this.$emit('on-index-change', rowIndex, itemStatus)
    },
    // 单选操作
    singleClickItem (rowIndex, key) {
      if (this.hitJump(key)) {
        this.$emit('on-hit-row-column', rowIndex, key)
        return
      }
      if (this.currentClickRow === rowIndex) {
        this.currentClickRow = -1
      } else {
        this.currentClickRow = rowIndex
      }
    },
    clickRowReset () {
      this.currentClickRow = -1
    },
    onActions (actionIndex, rowIndex) {
      this.$emit('on-table-actions', actionIndex, rowIndex)
      this.currentClickRow = -1
    },
    computeOperationMarginLeft () {
      if (this.$i18n.locale === 'cn') {
        // 中文显示
        let chineseCharLength = 0
        let chineseHorizionPaddingLength = this.actions.length
        for (let index = 0; index < this.actions.length; index++) {
          let element = this.actions[index]
          chineseCharLength += this.$t(element.name).length
        }
        return `${this.$globalConst.contentWidth - this.actionChineseCharWidth * chineseCharLength - 20 * 2 * chineseHorizionPaddingLength - 2 * this.actionButtonHorizonPadding}px`
      } else {
        // 英文显示
        // return `${this.$globalConst.contentWidth - this.actionButtonWidth * this.actions.length - 2 * this.actionButtonHorizonPadding}px`
        return '0px'
      }
    },
    initMutiChoiceArr () {
      // 添加选择数据
      this.mutiChoiceArr = []
      for (let index = 0; index < this.data.length; index++) {
        let element = {}
        element.checked = false
        this.mutiChoiceArr.push(element)
      }
    },
    processHTMLData (htmlData) {
      htmlData = htmlData.toString()
      // 获取Prime数据
      let primeStartIndex = htmlData.indexOf('<p target="_blank"')
      let primeContent = ''
      if (primeStartIndex !== -1) {
        primeContent = htmlData.substring(primeStartIndex, htmlData.length)
        htmlData = htmlData.substring(0, primeStartIndex)
      }

      // 获取商品链接数据
      let linkStartIndex = htmlData.indexOf('<a target="_blank"')
      let linkContent = ''
      if (linkStartIndex !== -1) {
        linkContent = htmlData.substring(linkStartIndex, htmlData.length)
        htmlData = htmlData.substring(0, linkStartIndex)
      }

      if (htmlData.indexOf('<br>') === -1) {
        return htmlData
      } else {
        let htmlList = htmlData.split('<br>')
        let processedList = []
        for (let index = 0; index < htmlList.length; index++) {
          let element = htmlList[index]
          if (element.indexOf(':') === -1) {
            processedList.push(element)
          } else {
            let processingList = []
            processingList[0] = element.substring(0, element.indexOf(':'))
            processingList[1] = element.substring(element.indexOf(':') + 1, element.length)
            // let processingList = element.split(':')

            // UPC变色.
            if (processingList[0].toUpperCase() === 'UPC') {
              processingList[1] = '<span style="color:red;">' + processingList[1] + '</span>'
            }
            // 商品名称变色.
            if ((processingList[0].toUpperCase() === 'PRODUCT NAME') || processingList[0].toUpperCase() === '商品名称') {
              processingList[1] = '<span style="color:#215cb1;">' + processingList[1] + '</span>'
            }
            // 需要变色跳转操作
            let hitIndex = this.hitContent(processingList[0].toUpperCase())
            if (hitIndex !== -1) {
              let processStyle = ''
              if (this.jumpColorList[hitIndex].colorFit !== undefined) {
                if (this.jumpColorList[hitIndex].colorFit.indexOf(processingList[1]) !== -1) {
                  processStyle = '<span style="color:' + this.jumpColorList[hitIndex].color + '; cursor: pointer; font-weight:bold;">'
                } else {
                  processStyle = '<span style="cursor: pointer; font-weight:bold;">'
                }
              } else {
                processStyle = '<span style="color:' + this.jumpColorList[hitIndex].color + '; cursor: pointer; font-weight:bold;">'
              }
              processingList[1] = processStyle + processingList[1] + '</span>'
            }
            let info = processingList[1]
            processedList.push(info)
          }
        }
        let processedInfo = ''
        for (let index = 0; index < processedList.length; index++) {
          if (index !== processedList.length - 1) {
            processedInfo += processedList[index] + '<br>'
          } else {
            processedInfo += processedList[index]
          }
        }

        // 在尾部添加Prime
        if (primeContent.length > 0) {
          processedInfo += primeContent
        }

        // 在尾部添加商品链接
        if (linkContent.length > 0) {
          processedInfo += linkContent
        }
        return processedInfo
      }
    },
    hitContent (currentContent) { // 可以点击的字体选择哪种颜色
      let index = -1
      if ((this.jumpColorList === undefined) || (this.jumpColorList.length === 0)) {
        index = -1
      } else {
        for (let i = 0; i < this.jumpColorList.length; i++) {
          if (this.$t(this.jumpColorList[i].title).toUpperCase() === currentContent.toUpperCase()) {
            index = i
            break
          }
        }
      }
      return index
    },
    hitJump (key) { // 看看是不是点击到了可以点击的字体的那一列
      let isHitJump = false
      if (this.jumpColorList === undefined) {
        return isHitJump
      }
      for (let index = 0; index < this.jumpColorList.length; index++) {
        if (this.jumpColorList[index].title === key) {
          isHitJump = true
        }
      }
      return isHitJump
    }
  },
  beforeMount () {
    this.colorList = this.colorListProp
    this.initMutiChoiceArr()
    if (this.optionAllProp !== undefined) {
      this.optionAll = this.optionAllProp
    }
  },
  watch: {
    'data' (to, from) {
      this.initMutiChoiceArr()
    },
    // 观察isCheckAllToGridProp变化，调整GridComponent全选或全不选
    'isCheckAllToGridProp' (to, from) {
      this.GridCheckAllLocal = this.isCheckAllToGridProp
      for (let index = 0; index < this.mutiChoiceArr.length; index++) {
        let element = this.mutiChoiceArr[index]
        element.checked = to
      }
    },
    'colorListProp' (to, from) {
      this.colorList = this.colorListProp
    },
    optionAllProp: {
      handler (to, from) {
        this.optionAll = to
        for (let index = 0; index < this.mutiChoiceArr.length; index++) {
          this.mutiChoiceArr[index].checked = this.optionAll[index].checked
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

.operation-layout {
  clear: both;
  overflow: hidden;
  height: 40px;
  margin-top: -20px;
  background: #e4eefd;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: flex-start;
  padding: 0px 10px;
}

.operation-action-content {
  height: 40px;
  padding: 0px 20px;
  color: #215cb1;
  font-size: 14px;
}

.muti-choice-td-layout {
  width: 40px;
  height: 40px;
}

.radio-button {
  width: 10px;
  height: 10px;
}

.click-row-style {
  background-color: #d5d5d5;
  vertical-align: middle;
}

.line-bg-style {
  background: #f0f0f0;
}

table {
  background-color: white;
  border:solid #ffffff;
  border-width:1px 1px 1px 1px;
  width: 100%;
}

tr {
  background: #f9f9f9
}

tr:hover{background-color: #fffcdf;}

th {
  background-color: #c4cbd6;
  color: #484848;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding: 0px 0px;
  text-align: center;
}

td {
  color: #484848;
  vertical-align: middle;
  font-size: 12px;
  border:solid #ffffff;
  border-width:0px 1px 1px 0px;
  height: 20px;
  line-height: 20px;
  padding: 10px 0px;
  text-align: center;
}

</style>
