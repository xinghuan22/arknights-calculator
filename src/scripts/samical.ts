import { ref } from 'vue'
export { behaviors, special_cadres, calDimensions, totalScore, special_cadres_Value, base}
export { addDimension, rmDimension, handleChange }

// 总分
const totalScore = ref(100)
// 全局倍率
let base = 1
// 是否通过第三层
let third = false
// special_cadres
const special_cadres_Value = ref([])

const calDimensions = ref([
  {
    score: 100,
    behavior: '',
    id: Math.random().toString(36).slice(-8),
    // 是否boss战
    boss_fight: false,
    value: []
  }
])


// 事件选择时计算分数
const handleChange = (index: number, value: never[]) => {
  let last_score = 100
  if (index > 0) {
    last_score = calDimensions.value[index - 1].score
  }
  for (let i = index; i < calDimensions.value.length; i++) {
    const dimension = calDimensions.value[i]
    dimension.score = last_score
    value = dimension.value
    const v = value[value.length - 1]
    dimension.behavior = v
    if (value[value.length - 2] == 'boss_three') {
      dimension.boss_fight = true
      dimension.score += 100
      dimension.score *= 1 + v
      third = true
    } else if (value[value.length - 2] == 'boss_final') {
      dimension.boss_fight = true
      dimension.score += Math.trunc(v)
      dimension.score *= v - Math.trunc(v)
    } else if (value[value.length - 2] == 'error_patch') {
      if (v == 'ban') {
        base = 0.7
      } 
      if (v == 'limit_one') {
        if (third) {
          dimension.score *= 1-0.3
        } else {
          dimension.score -= 80
        }
      }
      if (v == 'limit_two') {
        if (third) {
          dimension.score *= 1-0.25
        } else {
          dimension.score -= 60
        }
      }
      if (v == 'limit_three') {
        if (third) {
          dimension.score *= 1-0.2
        } else {
          dimension.score -= 40
        }
      }
    } else {
      // 计算分数
      if (v < 1) {
        dimension.score *= (v + 1)
      } else if (v > 1) {
        dimension.score += v
      }
    }
    calDimensions.value[i] = dimension
    last_score = dimension.score
    console.log(dimension, v)
  }
  totalScore.value = last_score*base
}

const addDimension = (index: number) => {
  // 获取上一项
  let s = 100
  if (index > 0) {
    s = calDimensions.value[index - 1].score
  }

  const last = {
    score: s,
    behavior: '',
    id: Math.random().toString(36).slice(-8),
    boss_fight: false,
    value: []
  }
  // 在下一个位置插入
  calDimensions.value.splice(index + 1, 0, last)
}

const rmDimension = (index: number) => {
  calDimensions.value.splice(index, 1)
}

const patch_cadres = [
  {
    value: 40,
    label: '6星干员'
  },
  {
    value: 25,
    label: '5星干员'
  },
  {
    value: 15,
    label: '4星及以下干员'
  },
  {
    value: 10,
    label: '临时招募'
  },
  {
    value: 'error_patch',
    label: '错误抓取',
    children: [
      {
        value: 'ban',
        label: 'Ban位干员（最后结算*0.7）',
      },
      {
        value: 'limit_one',
        label: '限一干员（三层前分数计算-80，第三层开始分数计算-30%）',
      },
      {
        value: 'limit_two',
        label: '限二干员（三层前分数计算-60，第三层开始分数计算-25%）',
      },
      {
        value: 'limit_three',
        label: '限三干员（三层前分数计算-40，第三层开始分数计算-20%）',
      }
    ]
  },
]
const update_cadres = [
  {
    value: 20,
    label: '6星干员'
  },
  {
    value: 15,
    label: '5星干员'
  },
  {
    value: 10,
    label: '4星及以下干员'
  },
  {
    value: 10,
    label: '临时招募'
  }
]
const patch_collections = [
  {
    value: 30,
    label: '普通藏品'
  },
  {
    value: 40,
    label: '**之手'
  },
  {
    value: 50,
    label: '书本、安玛的爱'
  },
  {
    value: 0.25,
    label: '无垠赠礼'
  },
  {
    value: 0.35,
    label: '空间碎片、深度灼痕、坍缩之种'
  },
  {
    value: -0.05,
    label: '源石鸢尾花、古旧铸物、女妖之吻、宁静泉流、高卢银行支票、荆棘环'
  },
  {
    value: -0.1,
    label: '第二经济改革法、"复仇者"、损坏的左轮弹巢、岩角号、银餐叉'
  },
  {
    value: -0.15,
    label: '空羽兽、立体艺术装置、迷迭香之拥、金酒之杯'
  },
  {
    value: -0.25,
    label: '大静谧、老蒲扇'
  },
  {
    value: 400,
    label: '凑齐三件国王系列藏品'
  }
]
const fights = [
  {
    value: 20,
    label: '普通作战'
  },
  {
    value: 'event_fight',
    label: '事件作战',
    children: [
      {
        value: 15,
        label: '+15'
      },
      {
        value: 25,
        label: '+25'
      },
      {
        value: 35,
        label: '+35'
      },
      {
        value: 50,
        label: '+50'
      }
    ]
  },
  {
    value: 50,
    label: '突袭作战'
  },
  {
    value: 0.2,
    label: '高难度突袭作战'
  },
  {
    value: 'boss_three',
    label: '三层BOSS',
    children: [
      {
        value: 0.5,
        label: '自然之怒'
      },
      {
        value: 0.6,
        label: '利刃所指、新部族'
      },
      {
        value: 0.7,
        label: '呼吸'
      },
      {
        value: 0.75,
        label: '大地醒转'
      },
      {
        value: 0.8,
        label: '夺树者'
      }
    ]
  },
  {
    value: 'boss_final',
    label: '结局boss',
    children: [
      {
        value: 200.2,
        label: '巍峨银凇'
      },
      {
        value: 180.3,
        label: '萨米之熵'
      },
      {
        value: 160.4,
        label: '园丁'
      },
      {
        value: 140.5,
        label: '时光之沙'
      }
    ]
  },
]
const special_cadres = [
  "弑君者", "止颂", "伺夜", "琳琅诗怀雅", "淬羽赫默"
]

const behaviors = [
  {
    value: 'patch_cadres',
    label: '招募干员',
    children: patch_cadres
  },
  {
    value: 'update_cadres',
    label: '进阶干员',
    children: update_cadres
  },
  {
    value: 'patch_collections',
    label: '获得藏品',
    children: patch_collections
  },
  {
    value: 'fights',
    label: '作战',
    children: fights
  }
]