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
          <h3 v-if="dimension.name !== '游戏结算'">{{ dimension.name }}: {{ score(dimension) }}</h3>
          <div v-else>
            <h3>
              {{ dimension.name }}
              <el-input-number class="number" v-model="dimension.score" />
              得分：{{ dimension.score }}
            </h3>
          </div>
          <div v-for="numItem in dimension.numItems" :key="numItem.id" class="slider-demo-block">
            <span class="score">{{ numItem.name }}</span>
            <span class="score">({{ numItem.score }})</span>
            <el-slider v-if="numItem.max == 100" v-model="numItem.value" show-input />
            <el-input-number
              v-else
              v-model="numItem.value"
              class="right-number"
              :min="0"
              :max="10"
            />
          </div>
          <div v-for="boolItem in dimension.boolItems" :key="boolItem.id" class="slider-demo-block">
            <el-checkbox v-model="boolItem.value" :label="boolItem.name" class="score" />
            <span class="score">({{ boolItem.score }})</span>
          </div>
        </div>
        <div v-if="calDimension.name === 'td'" class="reset">
          <el-button @click="reset()">重置</el-button>
        </div>
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
    border: 1px solid whitesmoke;
  }

  h3 {
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  .sagou-cal {
    background-color: aliceblue;
    color: rgb(96, 98, 102);
  }

  .dimension {
    border: 1px solid black;
  }

  h3 {
    color: black;
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
      flex: 1;
    }
    width: 100%;
  }

  .item-box {
    padding: 5px;
    display: flex;
    flex-direction: column;
  }

  .dimension {
    display: flex;
    flex-direction: column;
    margin-top: 3px;
    padding: 3px;
  }
}

.slider-demo-block {
  display: flex;
  align-items: center;
  flex-direction: row;
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


import  DialogInfo  from '../components/DialogInfo.vue'

const isDark = useDark()

function getbg() {
  return new URL('../assets/bg_sakazi.png', import.meta.url).href
}
const readme = '本计算器是专用于萨构杯2的计算器，只计算分数性规则，不考虑无分数的限制性规则。'
const digit_rule = `一，结局：1结局10分(滚动20分),  2结局30分（滚动40分）,  3结局30分,  4结局40分,   5结局50分超大蛋80分（1，2，3混乱额外加20分，4，5混乱额外加40分，5超大蛋混乱额外加60分) （13，23连打不额外加分，135，235连打额外加10分，145连打额外加20分，245连打额外加30分）（无漏额外加20分）
二，关卡：神出鬼没，混沌，莱茵卫士，建制，洞天福地，外道  普通10分 紧急15分（可重复拿分）
三，隐藏：狗鸭熊鼠一只10分
四，藏品：美愿藏品超过35后每一个藏品扣除15分，死仇藏品超过55后每一个藏品扣除15分  特殊：不连打三个结局不得使用藏品拱门与呼救（判定标准为拿取结局藏品即可）（使用扣除50分）
五，特殊：构想数量少于20时，顺利通关时分数额外+10%
六，取钱：超过100限额后每取一块扣5分
七，团队：抓取最少六星的团队额外加100分
八，临招干员：六星每个30分，四，五星每个10分（不包括基础预备干员，即郁金香，Touch等）
九，神人分队通关后获得1.1的补偿系数
十，节目效果分为三档 1.00，1.05，1.1 由裁判团投票商讨得出
`

const limit_rule = `1. 杯赛地图选定为【萨卡兹N13】
2.	关于分组:3人小组赛形式（尽量按选手实力平均分配）
3.	宗旨：选手能展示ban维和蓝图后各种多样化的打法
4.	分队选择：禁用蓝图分队，点刺分队
        神人分队特殊说明：现场刷开局，在三层boss门口前可以重开(一次机会）
        异想天开分队特殊说明：现场抽取分队效果（两次机会）
4.	关于干员：同一组内使用六星不可重复（特别的，若抓取临招维什戴尔团队得分*0.9），开赛前每个队伍将选择两名六星干员进入自己的ban池（全队禁用），ban池将打乱顺序随机分配（提醒：可能抽到自己队伍的ban池）
5.	关于重开：进3层没有任何动作时可选择重开（神人分队特殊，详情看第3条），每人一次机会，重开可刷开局，开局没相遇可选择直接重开（无次数限制）
6.	每个选手每局仅能招募一名带有集成战略模组的干员（不使用集成战略模组不算入）
7.	关于取钱：每个小组限取100块（可存钱补充，多取将有扣分惩罚）
8.	相遇选择：每个队伍内至少要有一名死仇玩家（以相遇选择为准）
9.	禁用藏品：罗德之门，生还者合约
`

var scoresMap = {
  cadres: {
    sixStar: 20,
    fiveStar: 15,
    fourStar: 10,
    repeat: -200,
    ban: -1000
  },
  ends: {
    twoEnds: 150,
    xiuchui: 80,
    mubei: 120,
    qishi: 220,
    qishiwulou: 280,
    dadi: 170,
    dadiwulou: 230,
    shuiyue: 200,
    shuiyuewulou: 260
  },
  fights: {
    chaoxue: 50,
    zhanqianguhou: 50,
    haomeng: 50,
    lingdiyishi: 50,
    chongyuzhixu: 50,
    shouliechang: 50,
    jixiezhizai: 50,
    yujinfangzhen: 50,
    shendurenzhi: 60,
    shuihuoxiangrong: 100,
    shikong: 100
  },
  collection: {
    everything: 20
  },
  hide: {
    ya: 10
  },
  team: {
    ban: -1000
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

var calTree = reactive({
  Cadre: {
    name: '临时招募得分',
    boolItems: [],
    numItems: [cadres.sixStar, cadres.fiveStar, cadres.fourStar],
    score: 0
  },
  Ends: {
    name: '结局得分',
    boolItems: [
      {
        id: 'twoEnds',
        name: '双结局',
        value: false,
        score: scoresMap.ends.twoEnds
      },
      {
        id: 'qishi',
        name: '“命运的宠儿”',
        value: false,
        score: scoresMap.ends.qishi
      },
      {
        id: 'qishiwulou',
        name: '“命运的宠儿”无漏',
        value: false,
        score: scoresMap.ends.qishiwulou
      },
      {
        id: 'dadi',
        name: '大群所向',
        value: false,
        score: scoresMap.ends.dadi
      },
      {
        id: 'dadiwulou',
        name: '大群所向无漏',
        value: false,
        score: scoresMap.ends.dadiwulou
      },
      {
        id: 'shuiyue',
        name: '人之光辉',
        value: false,
        score: scoresMap.ends.shuiyue
      },
      {
        id: 'shuiyuewulou',
        name: '人之光辉无漏',
        value: false,
        score: scoresMap.ends.shuiyuewulou
      }
    ],
    numItems: [],
    score: 0
  },
  Fights: {
    name: '紧急作战得分',
    boolItems: [],
    numItems: [
      {
        id: 'chaoxue',
        name: '紧急巢穴',
        value: 0,
        max: 10,
        score: scoresMap.fights.chaoxue
      },
      {
        id: 'zhanqianguhou',
        name: '紧急瞻前顾后',
        value: 0,
        max: 10,
        score: scoresMap.fights.zhanqianguhou
      },
      {
        id: 'haomeng',
        name: '紧急好梦在何方',
        value: 0,
        max: 10,
        score: scoresMap.fights.haomeng
      },
      {
        id: 'lingdiyishi',
        name: '紧急领地意识',
        value: 0,
        max: 10,
        score: scoresMap.fights.lingdiyishi
      },
      {
        id: 'chongyuzhixu',
        name: '紧急铳与秩序',
        value: 0,
        max: 10,
        score: scoresMap.fights.chongyuzhixu
      },
      {
        id: 'shouliechang',
        name: '紧急狩猎场',
        value: 0,
        max: 10,
        score: scoresMap.fights.shouliechang
      },
      {
        id: 'jixiezhizai',
        name: '紧急机械之灾',
        value: 0,
        max: 10,
        score: scoresMap.fights.jixiezhizai
      },
      {
        id: 'yujinfangzhen',
        name: '紧急余烬方阵',
        value: 0,
        max: 10,
        score: scoresMap.fights.yujinfangzhen
      },
      {
        id: 'shendurenzhi',
        name: '紧急深度认知',
        value: 0,
        max: 10,
        score: scoresMap.fights.shendurenzhi
      },
      {
        id: 'shuihuoxiangrong',
        name: '紧急水火相容',
        value: 0,
        max: 10,
        score: scoresMap.fights.shuihuoxiangrong
      },
      {
        id: 'shikong',
        name: '紧急失控',
        value: 0,
        max: 10,
        score: scoresMap.fights.shikong
      }
    ],
    score: 0
  },
  Collection: {
    name: '藏品得分',
    boolItems: [],
    numItems: [
      {
        id: 'collection',
        name: '藏品',
        value: 0,
        max: 100,
        score: scoresMap.collection.everything
      }
    ],
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
      }
    ],
    score: 0
  },
  Special: {
    name: '特殊作战得分',
    boolItems: [
      {
        id: 'xiuchui',
        name: '荒地群猎',
        value: false,
        score: scoresMap.ends.xiuchui
      },
      {
        id: 'hanzai',
        name: '寒灾之咒',
        value: false,
        score: scoresMap.ends.xiuchui
      },
      {
        id: 'mubei',
        name: '险路勿近',
        value: false,
        score: scoresMap.ends.mubei
      }
    ],
    numItems: [],
    score: 0
  },
  
  Game: {
    name: '游戏结算',
    boolItems: [],
    numItems: [],
    score: 0
  },
})

const firstCalDimension = {
  name: 'fd',
  dimensions: [calTree.Cadre, calTree.Ends, calTree.Hide]
}

const secondCalDimension = {
  name: 'sd',
  dimensions: [calTree.Special, calTree.Fights]
}

const thirdCalDimension = {
  name: 'td',
  dimensions: [calTree.Collection, calTree.Game]
}

const calDimensions = ref([firstCalDimension, secondCalDimension, thirdCalDimension])

const dimensionScore = (item: any) => {
  var score = 0
  item.boolItems.forEach((boolItem: any) => {
    if (boolItem.value) {
      score += boolItem.score
    }
  })
  item.numItems.forEach((numItem: any) => {
    score += numItem.value * numItem.score
  })
  item.score = score
  return score
}

const totalScore = () => {
  return (
    calTree.Cadre.score +
    calTree.Ends.score +
    calTree.Collection.score +
    calTree.Hide.score +
    calTree.Special.score +
    calTree.Fights.score +
    calTree.Game.score
  )
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
    cal[key].boolItems.forEach((boolItem: any) => {
      boolItem.value = false
    })
    cal[key].numItems.forEach((numItem: any) => {
      numItem.value = 0
    })
  }
}
</script>
