<template>
  <div class="mizuki-cal" :class="{ dark: isDark }">
    <div class="mizuki">
      <el-image :src="getbg()" />
    </div>
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
            <el-input-number v-else v-model="numItem.value" class="right-number" :min="0" :max="10" />
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
          <h1>Mizuki</h1>
        </div>
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row> -->
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  .mizuki-cal {
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
  .mizuki-cal {
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
  .mizuki-cal {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 1200px;
    margin: 0 auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .mizuki {
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

const isDark = useDark()

function getbg() {
  return new URL('../assets/bg_mizuki.png', import.meta.url).href
}

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
  Ban: {
    name: '违反规则得分',
    boolItems: [
      {
        id: 'yedao',
        name: '抓取麒麟R夜刀',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'logos',
        name: '抓取逻各斯',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'maenna',
        name: '抓取玛恩纳',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'tifeng',
        name: '抓取提丰',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'wendi',
        name: '抓取温蒂',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'weishidaier',
        name: '抓取维什戴尔',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'wulian',
        name: '抓取巫恋',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'xinsheng',
        name: '心胜于物开局',
        value: false,
        score: scoresMap.team.ban
      },
      {
        id: 'yirenweiben',
        name: '以人为本开局',
        value: false,
        score: scoresMap.cadres.ban
      },
      {
        id: 'like',
        name: '同一分队/六星开局',
        value: 0,
        score: scoresMap.team.ban
      }
    ],
    numItems: [
      {
        id: 'repeat',
        name: '重复六星',
        value: 0,
        max: 10,
        score: scoresMap.cadres.repeat
      }
    ],
    score: 0
  },
  Game: {
    name: '游戏结算',
    boolItems: [],
    numItems: [],
    score: 0
  },
  Total: {
    name: '总得分',
    boolItems: [],
    numItems: [],
    score: 0
  }
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
  dimensions: [calTree.Collection, calTree.Ban, calTree.Game, calTree.Total]
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
    calTree.Ban.score +
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
