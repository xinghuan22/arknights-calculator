import { ref } from 'vue'
export { behaviors, special_cadres, calDimensions, totalScore, base }
export { addDimension, rmDimension, handleChange, reset, special_cadre_change }

// 总分
const totalScore = ref(100)
// 全局倍率
const base = ref(1)
// 是否通过第三层
let third = false

const calDimensions = ref([
  {
    score: 100,
    behavior: '',
    id: Math.random().toString(36).slice(-8),
    // 是否boss战
    boss_fight: false,
    value: [],
    special_cadres_Value: []
  }
])

// 事件选择时计算分数
const handleChange = (index: number) => {
  calscore(index)
}

const special_cadre_change = (index: number) => {
  calscore(index)
}

const calscore = (index: number) => {
  let last_score = 100
  if (index > 0) {
    last_score = calDimensions.value[index - 1].score
  }
  for (let i = index; i < calDimensions.value.length; i++) {
    const dimension = calDimensions.value[i]
    dimension.score = last_score
    const value = dimension.value
    const v = value[value.length - 1]
    dimension.behavior = v
    if (value[value.length - 2] == 'boss_three') {
      dimension.score += 100
      dimension.score *= 1 + v
      third = true
    } else if (value[value.length - 2] == 'boss_final') {
      dimension.score += Math.trunc(v)
      dimension.score *= v - Math.trunc(v)+1
    } else if (value[value.length - 2] == 'error_patch') {
      if (v == 'ban') {
        base.value = 0.7
      }
      if (v == 'limit_one') {
        if (third) {
          dimension.score *= 1 - 0.3
        } else {
          dimension.score -= 80
        }
      }
      if (v == 'limit_two') {
        if (third) {
          dimension.score *= 1 - 0.25
        } else {
          dimension.score -= 60
        }
      }
      if (v == 'limit_three') {
        if (third) {
          dimension.score *= 1 - 0.2
        } else {
          dimension.score -= 40
        }
      }
    } else if ( v == 'special_cadres') {
      dimension.boss_fight = true
      dimension.score += dimension.special_cadres_Value.length*150
    } else {
      // 计算分数
      if (v < 1) {
        dimension.score *= v + 1
      } else if (v > 1) {
        dimension.score += v
      }
    }
    calDimensions.value[i] = dimension
    last_score = dimension.score
  }
  totalScore.value = last_score
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
    value: [],
    special_cadres_Value: []
  }
  // 在下一个位置插入
  calDimensions.value.splice(index + 1, 0, last)
}

const rmDimension = (index: number) => {
  calDimensions.value.splice(index, 1)
}

const reset = () => {
  calDimensions.value = [
    {
      score: 100,
      behavior: '',
      id: Math.random().toString(36).slice(-8),
      boss_fight: false,
      value: [],
      special_cadres_Value: []
    }
  ]
  totalScore.value = 100
  base.value = 1
}

const patch_cadres = [
  {
    value: 40,
    label: '6星干员（+40）'
  },
  {
    value: 25,
    label: '5星干员（+25）'
  },
  {
    value: 15,
    label: '4星及以下干员（+15）'
  },
  {
    value: 10,
    label: '临时招募（+10）'
  },
  {
    value: 'error_patch',
    label: '错误抓取',
    children: [
      {
        value: 'ban',
        label: 'Ban位干员（最后结算*0.7）'
      },
      {
        value: 'limit_one',
        label: '限一干员（三层前分数计算-80，第三层开始分数计算-30%）'
      },
      {
        value: 'limit_two',
        label: '限二干员（三层前分数计算-60，第三层开始分数计算-25%）'
      },
      {
        value: 'limit_three',
        label: '限三干员（三层前分数计算-40，第三层开始分数计算-20%）'
      }
    ]
  }
]
const update_cadres = [
  {
    value: 20,
    label: '6星干员（+20）'
  },
  {
    value: 15,
    label: '5星干员（+15）'
  },
  {
    value: 10,
    label: '4星及以下干员（+10）'
  },
  {
    value: 10,
    label: '临时招募（+10）'
  }
]
const patch_collections = [
  {
    value: 30,
    label: '普通藏品（+30）'
  },
  {
    value: 40,
    label: '**之手（+40）'
  },
  {
    value: 50,
    label: '书本、安玛的爱（+50）'
  },
  {
    value: 0.25,
    label: '无垠赠礼（+25%）'
  },
  {
    value: 0.35,
    label: '空间碎片、深度灼痕、坍缩之种（+35%）'
  },
  {
    value: -0.05,
    label: '源石鸢尾花、古旧铸物、女妖之吻、宁静泉流、高卢银行支票、荆棘环（-5%)'
  },
  {
    value: -0.1,
    label: '第二经济改革法、"复仇者"、损坏的左轮弹巢、岩角号、银餐叉（-10%)'
  },
  {
    value: -0.15,
    label: '空羽兽、立体艺术装置、迷迭香之拥、金酒之杯（-15%)'
  },
  {
    value: -0.25,
    label: '大静谧、老蒲扇（-25%)'
  },
  {
    value: 400,
    label: '凑齐三件国王系列藏品（+400）'
  }
]
const fights = [
  {
    value: 20,
    label: '普通作战（+20）'
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
    label: '突袭作战（+50）'
  },
  {
    value: 0.2,
    label: '高难度突袭作战（+20%）'
  },
  {
    value: 'boss_three',
    label: '三层BOSS',
    children: [
      {
        value: 0.5,
        label: '自然之怒（+100，+50%）'
      },
      {
        value: 0.6,
        label: '利刃所指、新部族（+100，+60%）'
      },
      {
        value: 0.7,
        label: '呼吸（+100，+70%）'
      },
      {
        value: 0.75,
        label: '大地醒转（+100，+75%）'
      },
      {
        value: 0.8,
        label: '夺树者（+100，+80%）'
      }
    ]
  },
  {
    value: 'boss_final',
    label: '结局boss',
    children: [
      {
        value: 200.2,
        label: '巍峨银凇（+200，+20%）'
      },
      {
        value: 180.3,
        label: '萨米之熵（+180，+30%）'
      },
      {
        value: 160.4,
        label: '园丁（+160，+40%）'
      },
      {
        value: 140.5,
        label: '时光之沙（+140，+50%）'
      }
    ]
  },
  {
    value: 'special_cadres',
    label: '携带特殊干员进行boss战（每个特殊干员+150）',
  }
]
const special_cadres = ['弑君者', '止颂', '伺夜', '琳琅诗怀雅', '淬羽赫默']

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
