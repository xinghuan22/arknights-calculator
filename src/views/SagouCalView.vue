<template>
  <div class="sagou-cal" :class="{ dark: isDark }">
    <div class="sagou">
      <el-image :src="getbg()" />
    </div>
    <DialogInfo
      :totalScore="totalScore()"
      :digit_rule="digit_rule"
      :limit_rule="limit_rule"
      :readme="readme"
      :reset="reset"
    />
    <div class="cal-item">
      <div v-for="calDimension in calDimensions" :key="calDimension.name" class="item-box">
        <div v-for="dimension in calDimension.dimensions" :key="dimension.name" class="dimension">
          <h3 v-if="title(dimension)">{{ dimension.name }}: {{ score(dimension) }}</h3>
          <div v-if="dimension.name == '游戏结算'">
            <h3>
              {{ dimension.name }}
              <el-input-number class="number" v-model="dimension.score" />
              得分：{{ dimension.score }}
            </h3>
          </div>
          <div
            v-if="dimension.name == '相遇选择'"
            style="min-height: 0; flex: 1 1 0; height: 100%; display: flex; flex-direction: column"
          >
            <h3 style="display: flex; align-items: center; flex: 1 1 0">
              {{ dimension.name }}
              <el-radio-group
                v-model="meet_select"
                text-color="#1a237e"
                fill="#91caff"
                style="margin-left: auto; justify-content: flex-end; margin-right: 1%"
              >
                <el-radio-button
                  v-for="item in dimension.checkbox?.items"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                />
              </el-radio-group>
            </h3>
          </div>
          <div v-for="numItem in dimension.numItems" :key="numItem.id" class="slider-demo-block">
            <span class="score">{{ numItem.name }}</span>
            <span v-if="numItem.score > 1" class="score">({{ numItem.score }})</span>
            <el-slider
              v-if="numItem.max == 100"
              v-model="numItem.value"
              :min="0"
              :max="numItem.max"
              show-input
            />
            <el-input-number
              v-else
              v-model="numItem.value"
              class="right-number"
              :min="0"
              :max="numItem.max"
            />
          </div>
          <div v-if="dimension.name == '结局得分'">
            <div
              v-for="(boolItem, index) in dimension.boolItems"
              :key="index"
              class="slider-demo-block"
            >
              <el-checkbox-group
                v-for="(item, i) in boolItem"
                :key="item.id + '_' + i"
                text-color="#1a237e"
                fill="#91caff"
                class="box"
                @change="checkboxChange(boolItem, i)"
                v-model="item.value"
              >
                <el-checkbox-button
                  :key="item.id + '_' + i + '_' + index"
                  value="true"
                  class="checkboxbutton"
                  :disabled="i != 0 && boolItem[0].value.length == 0"
                >
                  {{ item.name }}
                </el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
          <div v-if="dimension.name !== '结局得分'">
            <div v-for="(boolItem, index) in dimension.boolItems" :key="index">
              <el-checkbox
                v-for="(item, i) in boolItem"
                :key="item.id + '_' + i"
                v-model="item.bool_value"
                class="slider-demo-block score"
              >
                {{ item.name }}
              </el-checkbox>
            </div>
          </div>
          <div v-for="(item, index) in dimension.selectItem" :key="index" class="slider-demo-block">
            <span class="score">{{ item.name }}:</span>
            <el-select-v2
              v-model="item.value"
              placeholder="Please select"
              class="right-number"
              :options="item.items.map((i) => ({ label: i, value: i }))"
            />
          </div>
        </div>
        <!-- <div v-if="calDimension.name === 'td'" class="reset">
          <el-button @click="reset()">重置</el-button>
        </div> -->
      </div>
    </div>
    <!-- <el-row>
      <el-col :span="8"
        ><div class="grid-content ep-bg-purple">
          <h1>sagou</h1>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row> -->
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  .sagou-cal {
    background-color: rgb(36, 36, 40);
    color: rgb(207, 211, 220);
  }

  .dimension {
    /* border: 1px solid black; */
    box-shadow: 0 0 3px 2px rgba(133, 165, 179, 0.1);
  }

  .dimension:hover {
    box-shadow: 0 0 5px 4px rgba(209, 224, 231, 0.3);
  }

  h3 {
    color: white;
    color: rgb(135, 132, 140);
  }
  :deep(.checkboxbutton) {
    /* border: 2px solid rgba(255, 255, 255, 0); */
    border-left: 1px solid rgb(36, 36, 40);
    border-top: 1px solid rgb(36, 36, 40);
  }
  :deep(.checkboxbutton > span) {
    /* border: 2px solid rgba(255, 255, 255, 0); */
    background-color: rgb(36, 36, 40);
  }
  /* 选中时显示边框 */
  :deep(.checkboxbutton.is-disabled > span) {
    /* border: 2px solid aliceblue; */
    background-color: rgb(36, 36, 40) !important;
    opacity: 1 !important;
  }
  :deep(.checkboxbutton.is-checked) {
    /* border: 2px solid aliceblue; */
    border-left: 1px solid rgb(36, 36, 40);
  }
}

@media (prefers-color-scheme: light) {
  .sagou-cal {
    background-color: aliceblue;
    color: rgb(96, 98, 102);
  }

  .dimension {
    /* border: 1px solid black; */
    box-shadow: 0 0 3px 2px rgba(75, 127, 152, 0.1);
  }

  .dimension:hover {
    box-shadow: 0 0 5px 4px rgba(75, 127, 152, 0.3);
  }

  h3 {
    color: black;
  }

  :deep(.checkboxbutton) {
    /* border: 2px solid rgba(255, 255, 255, 0); */
    border-left: 1px solid aliceblue;
    border-top: 1px solid aliceblue;
  }
  :deep(.checkboxbutton > span) {
    /* border: 2px solid rgba(255, 255, 255, 0); */
    background-color: aliceblue;
  }
  /* 选中时显示边框 */
  :deep(.checkboxbutton.is-disabled > span) {
    /* border: 2px solid aliceblue; */
    background-color: aliceblue !important;
    opacity: 1 !important;
  }
  :deep(.checkboxbutton.is-checked) {
    /* border: 2px solid aliceblue; */
    border-left: 1px solid aliceblue;
  }
}

@media (min-width: 1024px) {
  .sagou-cal {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 1200px;
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .sagou {
    width: 1200px;
    height: calc(1200px / 1560px * 500px);
  }

  .cal-item {
    align-items: stretch;
    display: flex;
    justify-content: center;
    flex-direction: row;
    .item-box {
      flex: 1 1 0;
    }
    width: 100%;
    height: 450px;
  }

  .item-box {
    padding: 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .dimension {
    display: flex;
    flex-direction: column;
    margin-top: 3px;
    padding: 3px;
    flex: 1 1 0;
    height: 100%;
  }
}


.slider-demo-block {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap; /* 保证一行内展示 */
  overflow: hidden; /* 超出部分隐藏 */
}
.box {
  flex: 1;
  text-align: center;
  width: 100%;
  display: flex;
}

.checkboxbutton {
  flex: 1 1 0;
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 让内部 span 撑满 */
:deep(.checkboxbutton > span) {
  flex: 1 1 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-slider {
  width: 65%;
  margin-left: auto;
  margin-right: 5px;
  .el-input-number {
    width: 40%;
  }
}

.number {
  span {
    display: none;
  }
  width: 25%;
  .el-input__wrapper {
    padding-left: 10%;
    padding-right: 10%;
  }
}

.right-number {
  margin-left: auto;
  margin-right: 5px;
  width: 35%;
}

.score {
  margin-left: 3%;
}

h3 {
  margin-left: 5px;
}

.reset {
  margin-left: auto;
  margin-right: 5px;
  margin-top: auto;
  margin-bottom: 5px;
  width: 20%;
  height: 10%;
  .el-button {
    width: 100%;
    height: 100%;
  }
}
</style>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import { useDark } from '@vueuse/core'

import DialogInfo from '../components/DialogInfo.vue'

const isDark = useDark()

function getbg() {
  return new URL('../assets/bg_sakazi.png', import.meta.url).href
}
const readme = '本计算器是专用于萨构杯2的计算器, 只计算分数性规则, 不考虑无分数的限制性规则。'
const digit_rule = `一. 结局: 
    1结局10分 滚动20分, 2结局30分 滚动40分, 3结局30分, 4结局40分, 5结局50分 超大蛋80分
    1, 2, 3混乱额外加20分, 4, 5混乱额外加40分, 5超大蛋混乱额外加60分, 无漏额外加20分
    双结局不额外加分, 135, 235连打额外加10分, 145连打额外加20分, 245连打额外加30分  
二. 关卡: 神出鬼没, 混沌, 莱茵卫士, 建制, 洞天福地, 外道  普通10分 紧急15分(可重复拿分)
三. 隐藏: 狗鸭熊鼠一只10分
四. 藏品: 美愿藏品超过35后每一个藏品扣除15分, 死仇藏品超过55后每一个藏品扣除15分  
    不连打三个结局不得使用藏品拱门与呼救(判定标准为拿取结局藏品即可, 使用扣除50分)
五. 特殊: 构想数量少于20时, 顺利通关时分数额外+10%
六. 取钱: 超过100限额后每取一块扣5分
七. 团队: 抓取最少六星的团队额外加100分
八. 临招干员: 六星每个30分, 四, 五星每个10分(不包括基础预备干员, 即郁金香, Touch等)
九. 神人分队通关后获得1.1的补偿系数
十. 节目效果分为三档 1.00, 1.05, 1.1 由裁判团投票商讨得出
`

const limit_rule = `1. 杯赛地图选定为【萨卡兹N13】
2.	关于分组:3人小组赛形式(尽量按选手实力平均分配)
3.	宗旨: 选手能展示ban维和蓝图后各种多样化的打法
4.	分队选择: 禁用蓝图分队, 点刺分队
    神人分队特殊说明: 现场刷开局, 在三层boss门口前可以重开(一次机会)
    异想天开分队特殊说明: 现场抽取分队效果(两次机会)
4.	关于干员: 同一组内使用六星不可重复(特别的, 若抓取临招维什戴尔团队得分*0.9), 
    开赛前每个队伍将选择两名六星干员进入自己的ban池(全队禁用), 
    ban池将打乱顺序随机分配(提醒: 可能抽到自己队伍的ban池)
5.	关于重开: 进3层没有任何动作时可选择重开(神人分队特殊, 详情看第3条), 
    每人一次机会, 重开可刷开局, 开局没相遇可选择直接重开(无次数限制)
6.	每个选手每局仅能招募一名带有集成战略模组的干员(不使用集成战略模组不算入)
7.	关于取钱: 每个小组限取100块(可存钱补充, 多取将有扣分惩罚)
8.	相遇选择: 每个队伍内至少要有一名死仇玩家(以相遇选择为准)
9.	禁用藏品: 罗德之门, 生还者合约
`

const MEET_SICHOU = 0
const MEET_MEIYUAN = 1
const MEET_TUYA = 2

var meet_select = ref(-1)

var scoresMap = {
  cadres: {
    sixStar: 30,
    fiveStar: 10,
    fourStar: 10
  },
  ends: {
    gundong: 10,
    shouke: 10,
    chaoye: 30,
    shengcheng: 30,
    shoufa: 40,
    tutu: 50,
    tingzhi: 30,
    hunluan1: 20,
    hunluan2: 40,
    wulou: 20
  },
  fights: {
    normal: 10,
    serious: 15
  },
  collection: {
    everything: 0,
    gongmen: -50
  },
  hide: {
    ya: 10
  },
  special: {
    gouxiang: 0.1,
    quqian: -5,
    weishidaier: -0.1,
    shenrenfendui: 0.1
  },
  game: {
    score: 0
  }
}

var cadres = {
  sixStar: {
    id: 'sixStar',
    name: '六星',
    value: 0,
    max: 10,
    score: scoresMap.cadres.sixStar
  },
  fiveStar: {
    id: 'fiveStar',
    name: '五星',
    value: 0,
    max: 10,
    score: scoresMap.cadres.fiveStar
  },
  fourStar: {
    id: 'fourStar',
    name: '四星',
    value: 0,
    max: 10,
    score: scoresMap.cadres.fourStar
  }
}

const gundong = () => {
  return {
    id: 'gundong',
    name: '持有滚动先祖',
    value: [],
    bool_value: false,
    score: scoresMap.ends.gundong
  }
}

const hunluan1 = () => {
  return {
    id: 'hunluan1',
    name: '混乱',
    value: [],
    bool_value: false,
    score: scoresMap.ends.hunluan1
  }
}
const hunluan2 = () => {
  return {
    id: 'hunluan2',
    name: '混乱',
    value: [],
    bool_value: false,
    score: scoresMap.ends.hunluan2
  }
}

const wulou = () => {
  return {
    id: 'wulou',
    name: '无漏',
    value: [],
    bool_value: false,
    score: scoresMap.ends.wulou
  }
}

const tingzhi = () => {
  return {
    id: 'tingzhi',
    name: '持有思绪：停止',
    value: [],
    bool_value: false,
    score: scoresMap.ends.tingzhi
  }
}

var calTree = reactive({
  Pattern: {
    name: '相遇选择',
    boolItems: [],
    numItems: [],
    checkbox: {
      value: -1,
      items: [
        {
          id: 'die',
          name: '死仇',
          value: MEET_SICHOU
        },
        {
          id: 'mei',
          name: '美愿',
          value: MEET_MEIYUAN
        },
        {
          id: 'zhen',
          name: '涂鸦',
          value: MEET_TUYA
        },
        {
          id: 'all',
          name: '无相遇',
          value: -1
        }
      ]
    },
    selectItem: [],
    score: 0
  },
  Cadre: {
    name: '临时招募得分',
    boolItems: [],
    numItems: [cadres.sixStar, cadres.fiveStar, cadres.fourStar],
    checkbox: { value: 0, items: [] },
    selectItem: [],
    score: 0
  },
  Ends: {
    name: '结局得分',
    boolItems: [
      [
        {
          id: 'shouke',
          name: '紧急授课/思维矫正',
          value: [],
          bool_value: false,
          score: scoresMap.ends.shouke
        },
        gundong(),
        hunluan1(),
        wulou()
      ],
      [
        {
          id: 'chaoye',
          name: '朝谒/魂灵朝谒',
          value: [],
          bool_value: false,
          score: scoresMap.ends.chaoye
        },
        gundong(),
        hunluan1(),
        wulou()
      ],
      [
        {
          id: 'shengcheng',
          name: '圣城',
          value: [],
          bool_value: false,
          score: scoresMap.ends.shengcheng
        },
        hunluan1(),
        wulou()
      ],
      [
        {
          id: 'shoufa',
          name: '授法',
          value: [],
          bool_value: false,
          score: scoresMap.ends.shoufa
        },
        hunluan2(),
        wulou()
      ],
      [
        {
          id: 'tutu',
          name: '不容拒绝',
          value: [],
          bool_value: false,
          score: scoresMap.ends.tutu
        },
        tingzhi(),
        hunluan2(),
        wulou()
      ]
    ],
    numItems: [],
    checkbox: { value: 0, items: [] },
    selectItem: [],
    score: 0
  },
  Fights: {
    name: '作战得分',
    boolItems: [],
    numItems: [
      {
        id: 'shenchuguimo',
        name: '神出鬼没',
        value: 0,
        max: 10,
        score: scoresMap.fights.normal
      },
      {
        id: 'shenchuguimojinji',
        name: '紧急神出鬼没',
        value: 0,
        max: 10,
        score: scoresMap.fights.serious
      },
      {
        id: 'hundun',
        name: '混沌',
        value: 0,
        max: 10,
        score: scoresMap.fights.normal
      },
      {
        id: 'hundunjinji',
        name: '紧急混沌',
        value: 0,
        max: 10,
        score: scoresMap.fights.serious
      },
      {
        id: 'laiyinweishi',
        name: '莱茵卫士',
        value: 0,
        max: 10,
        score: scoresMap.fights.normal
      },
      {
        id: 'laiyinweishijinji',
        name: '紧急莱茵卫士',
        value: 0,
        max: 10,
        score: scoresMap.fights.serious
      },
      {
        id: 'jianzhi',
        name: '建制',
        value: 0,
        max: 10,
        score: scoresMap.fights.normal
      },
      {
        id: 'jianzhijinji',
        name: '紧急建制',
        value: 0,
        max: 10,
        score: scoresMap.fights.serious
      },
      {
        id: 'dongtianfudi',
        name: '洞天福地',
        value: 0,
        max: 10,
        score: scoresMap.fights.normal
      },
      {
        id: 'dongtianfudijinji',
        name: '紧急洞天福地',
        value: 0,
        max: 10,
        score: scoresMap.fights.serious
      },
      {
        id: 'waidao',
        name: '外道',
        value: 0,
        max: 10,
        score: scoresMap.fights.normal
      },
      {
        id: 'waidaojinji',
        name: '紧急外道',
        value: 0,
        max: 10,
        score: scoresMap.fights.serious
      }
    ],
    checkbox: { value: 0, items: [] },
    selectItem: [],
    score: 0
  },
  Collection: {
    name: '藏品得分',
    boolItems: [
      [
        {
          id: 'gongmen',
          name: '错误使用拱门与呼救',
          value: [],
          bool_value: false,
          score: scoresMap.collection.gongmen
        }
      ]
    ],
    numItems: [
      {
        id: 'collection',
        name: '藏品',
        value: 0,
        max: 100,
        score: scoresMap.collection.everything
      }
    ],
    checkbox: { value: 0, items: [] },
    selectItem: [],
    score: 0
  },
  Hide: {
    name: '隐藏得分',
    boolItems: [],
    numItems: [
      {
        id: 'ya',
        name: '鸭',
        value: 0,
        max: 10,
        score: scoresMap.hide.ya
      },
      {
        id: 'ya',
        name: '狗',
        value: 0,
        max: 10,
        score: scoresMap.hide.ya
      },
      {
        id: 'ya',
        name: '熊',
        value: 0,
        max: 10,
        score: scoresMap.hide.ya
      },
      {
        id: 'ya',
        name: '鼠',
        value: 0,
        max: 10,
        score: scoresMap.hide.ya
      }
    ],
    checkbox: { value: 0, items: [] },
    selectItem: [],
    score: 0
  },
  Special: {
    name: '特殊得分',
    boolItems: [
      [
        {
          id: 'shenrenfendui',
          name: '神人分队系数补正',
          value: [],
          bool_value: false,
          score: scoresMap.special.shenrenfendui
        },
        {
          id: 'gouxiang',
          name: '构想少于20时，顺利通关',
          value: [],
          bool_value: false,
          score: scoresMap.special.gouxiang
        },
        {
          id: 'linzhao',
          name: '抓取临召维什戴尔',
          value: [],
          bool_value: false,
          score: scoresMap.special.weishidaier
        }
      ]
    ],
    numItems: [
      {
        id: 'quqian',
        name: '取钱数量（团队）',
        value: 0,
        max: 150,
        score: 0
      },
      {
        id: 'jiesuan',
        name: '结算分数',
        value: 0,
        max: 3000,
        score: 1
      }
    ],
    checkbox: { value: 0, items: [] },
    selectItem: [
      {
        id: 'jiemuxiaoguo',
        name: '节目效果系数',
        value: 1,
        items: [1, 1.05, 1.1]
      }
    ],
    score: 0
  }
})

const firstCalDimension = {
  name: 'fd',
  dimensions: [calTree.Pattern, calTree.Cadre, calTree.Hide,calTree.Collection]
}

const secondCalDimension = {
  name: 'sd',
  dimensions: [calTree.Fights]
}

const thirdCalDimension = {
  name: 'td',
  dimensions: [calTree.Ends,  calTree.Special]
}

const calDimensions = ref([firstCalDimension, secondCalDimension, thirdCalDimension])

const dimensionScore = (item: any) => {
  var score = 0
  item.boolItems.forEach((boolItem: any[]) => {
    for (const item of boolItem) {
      if (item.value.length > 0) {
        score += item.score
      }
      if (item.bool_value && (item.score > 1 || item.score < -1)) {
        score += item.score
      }
    }
  })
  if (item.name == '结局得分') {
    if (item.boolItems[4][1].value.length > 0 && item.boolItems[4][2].value.length > 0) {
      score += 20 // 超大蛋混乱额外加20分
    }
    if (
      (item.boolItems[0][0].value.length > 0 || item.boolItems[1][0].value.length > 0) &&
      item.boolItems[2][0].value.length > 0 &&
      item.boolItems[4][0].value.length > 0
    ) {
      score += 10 // 135或235连打额外加10分
    }
    if (
      item.boolItems[0][0].value.length > 0 &&
      item.boolItems[3][0].value.length > 0 &&
      item.boolItems[4][0].value.length > 0
    ) {
      score += 20 // 145额外加20分
    }
    if (
      item.boolItems[1][0].value.length > 0 &&
      item.boolItems[3][0].value.length > 0 &&
      item.boolItems[4][0].value.length > 0
    ) {
      score += 30 // 245连打额外加30分
    }
  }
  if (item.name == '藏品得分') {
    if (meet_select.value == MEET_SICHOU && item.numItems[0].value > 55) {
      score -= 15 * (item.numItems[0].value - 55) // 死仇
    } else if (meet_select.value == MEET_MEIYUAN && item.numItems[0].value > 35) {
      score -= 15 * (item.numItems[0].value - 35) // 美愿
    } else if ((meet_select.value == MEET_TUYA || meet_select.value == -1) && item.numItems[0].value > 65) {
      // 涂鸦限制65藏品
      score -= 15 * (item.numItems[0].value - 65)
    }
  }
  item.numItems.forEach((numItem: any) => {
    score += numItem.value * numItem.score
  })
  if (item.name == '特殊得分' && item.numItems[0].value > 100) {
    score -= 5 * (item.numItems[0].value - 100)
  }
  item.score = score
  return score
}

const totalScore = () => {
  var score =
    calTree.Cadre.score +
    calTree.Ends.score +
    calTree.Collection.score +
    calTree.Hide.score +
    calTree.Special.score +
    calTree.Fights.score
  calTree.Special.boolItems.forEach((boolItem: any[]) => {
    for (const item of boolItem) {
      if (item.bool_value && item.score > -1 && item.score < 1) {
        score *= 1 + item.score
      }
    }
  })
  score *= calTree.Special.selectItem[0].value
  return score
}

const score = computed(() => (item: any) => {
  if (item.name == '总得分') {
    return totalScore()
  }
  return dimensionScore(item)
})

function reset() {
  const cal = Object(calTree)
  for (let key in calTree) {
    console.log(cal[key]) // 报错消失
    // do something
    cal[key].score = 0
    cal[key].checkbox.value = -1
    cal[key].boolItems.forEach((boolItem: any) => {
      for (const item of boolItem) {
        item.value = []
        item.bool_value = false
      }
    })
    cal[key].numItems.forEach((numItem: any) => {
      numItem.value = 0
    })
    cal[key].selectItem.forEach((selectItem: any) => {
      selectItem.value = 1
    })
  }
  meet_select.value = -1
}

const checkboxChange = (boolItem: any[], index: number) => {
  if (index == 0 && boolItem[0].value.length == 0) {
    boolItem.forEach((item: any) => {
        item.value = []
    })
  }
}

const title = (dimension: any) => {
  return dimension.name !== '游戏结算' && dimension.name !== '相遇选择'
}
</script>
