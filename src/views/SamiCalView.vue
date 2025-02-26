<template>
  <div class="sami-cal" :class="{ dark: isDark }">
    <div class="sami">
      <el-image :src="getbg()" />
    </div>
    <div class="cal-item">
      <div class="result">
        <el-button class="info" plain @click="useinfo">使用说明</el-button>
        <el-button class="info" plain @click="digit_info">分数性规则</el-button>
        <el-button class="info" plain @click="limit_info">限制性规则</el-button>
        <div class="reset">
          <el-text class="mx-1 score" size="large"
            >最终得分: {{ (totalScore * base).toFixed(2) }}</el-text
          >
          <el-button class="reset-button" type="primary" @click="reset">重置</el-button>
        </div>
      </div>
      <el-scrollbar height="60vh" class="item-box">
        <!-- <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
        <TransitionGroup
          name="list"
          enter-active-class="animate__animated animate__slideInRight"
          leave-active-class="animate__animated animate__slideOutLeft"
        >
          <div
            v-for="(calDimension, index) in calDimensions"
            :key="calDimension.id"
            class="item-box"
          >
            <div class="dimension">
              <el-cascader
                v-model="calDimension.value"
                :key="calDimension.id"
                :options="behaviors"
                :props="props"
                class="cascader"
                @change="handleChange(index)"
              />
              <div
                class="special-cadres"
                :style="{ visibility: calDimension.boss_fight ? 'visible' : 'hidden' }"
              >
                <el-text
                  class="mx-1"
                  size="large"
                  style="flex: 1; text-align: right; margin-right: 1%"
                  >携带干员</el-text
                >
                <el-select
                  v-model="calDimension.special_cadres_Value"
                  collapse-tags
                  collapse-tags-tooltip
                  multiple
                  placeholder="Select"
                  style="flex: 2"
                  @change="special_cadre_change(index)"
                >
                  <el-option
                    v-for="item in special_cadres"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                <el-text class="mx-1" size="large" style="flex: 1; margin-left: 1%"
                  >进行boss战</el-text
                >
              </div>
              <div class="option">
                <el-button type="primary" circle @click="addDimension(index)">
                  <el-icon><Plus /></el-icon>
                </el-button>

                <el-popconfirm title="确认删除?" @confirm="rmDimension(index)">
                  <template #reference>
                    <el-button type="primary" circle>
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </el-scrollbar>
    </div>
    <!-- <el-row>
        <el-col :span="8"
          ><div class="grid-content ep-bg-purple">
            <h1>sami</h1>
          </div>
        </el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
      </el-row> -->
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  .sami-cal {
    background-color: rgb(36, 36, 40);
    color: rgb(207, 211, 220);
  }

  .dimension {
    border: 1px solid whitesmoke;
  }

  .option {
    margin-right: 5px;
  }
}

@media (prefers-color-scheme: light) {
  .sami-cal {
    /* background-color: aliceblue; */
    background-color: transparent;
    color: rgb(96, 98, 102);
  }

  .dimension {
    border: 1px solid black;
  }

  .option {
    margin-right: 5px;
  }
}

@media (min-width: 1024px) {
  .sami-cal {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 5%;
    width: 1200px;
    margin: 0 auto;
  }

  .sami {
    width: 1200px;
    height: calc(1200px / 1560px * 500px);
    /* 如果需要，可以为图片容器添加背景色 */
    background-color: transparent;
  }

  .cal-item {
    background-color: aliceblue; /* 只给内容区添加背景色 */
    display: flex;
    justify-content: center;
    flex-direction: column;
    .item-box {
      flex: 1;
    }
    width: 100%;
    margin: 0 auto;
    border-radius: 8px; /* 可选：添加圆角 */
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
  }

  .item-box {
    padding: 5px;
    display: flex;
    flex-direction: column;
  }

  .dimension {
    display: flex;
    flex-direction: row;
    .cascader {
      flex: 6;
    }
    .option {
      flex: 1;
      text-align: right;
    }
    .special-cadres {
      flex: 3;
    }
    margin-top: 3px;
    padding: 3px;
  }
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
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

.list-move {
  transition: all 0.5s ease;
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

.result {
  margin-left: 1%;
  padding: 10px 0;
  height: auto;
  display: flex;
  flex-direction: row;
}

.info {
  margin-left: auto;
  margin-right: 5px;
  margin-top: auto;
  flex: 1;
  width: 10%;
  height: 10%;
  .el-button {
    width: 70%;
    height: 100%;
  }
}

.reset {
  margin-right: 1%;
  width: 30%;
  flex: 5;
  text-align: right;
}

.reset-button {
  width: 15% !important;
  height: 100% !important;
}

.special-cadres {
  display: flex;
  flex-direction: row;
}

.score {
  margin-right: 20%;
}

.option {
  margin-right: 5px;
}
</style>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import {
  behaviors,
  handleChange,
  calDimensions,
  addDimension,
  rmDimension,
  totalScore,
  special_cadres,
  base,
  reset,
  special_cadre_change
} from '../scripts/samical'

import { ElMessageBox } from 'element-plus'

const isDark = useDark()

function getbg() {
  return new URL('../assets/bg_sami.png', import.meta.url).href
}

const useinfo = () => {
  info('本计算器是专用于闹谭杯的计算器，只计算分数性规则，不考虑无分数的限制性规则。', '使用说明')
}
const digit_info = () => {
  info(digit_rule, '分数性规则')
}
const limit_info = () => {
  info(limit_rule, '限制性规则')
}

const info = (msg: string, title: string) => {
  ElMessageBox.alert(msg.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'), title, {
    // if you want to disable its autofocus
    // autofocus: false,
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'OK',
    customStyle: {
      'max-width': '40%'
    }
  })
}

// function toPercent(point: number) {
//   if (point > 1) {
//     return point
//   }
//   var str = Number(point * 100).toFixed()
//   str += '%'
//   return str
// }

const digit_rule = `1. 每位选手开局拥有100分初始分数
2. 当选手在比赛过程中，于第四层以前遇到或获得密文板【爱恋】时，必须选择【二三四连打】的结局走向，否则在分数结算时扣除四分之一的最终分数
3. 在【开始探索】之前，选手可以有五分钟的讨论时间，五分钟时间到，主持人提醒后，两位选手必须在一分钟内开启赛事，否则最终分数计算后将扣除四分之一
4. 作战相关 
    a. 当选手主动携带以下干员进行boss战时，每个单独计算分数【+150】：弑君者、止颂、伺夜、琳琅诗怀雅、淬羽赫默
    b. 作战类型相关分数
        选手每通过一次【普通作战】时，分数计算【+20】
        选手每通过一次【事件作战】时，分数视战斗内容计算【+15】/【+25】/【+35】/【+50】
        选手每通过一次【突袭作战】时，分数计算【+50】
        选手每通过一次高难度【突袭作战】时，分数计算【+20%】

    c. 当选手成功通关第三层boss战时，先计算【+100】后，再按照不同关卡计算：
        利刃所指/呼吸：   【+60%】/【+70%】
        新部族/夺树者：   【+60%】/【+80%】
        自然之怒/大地醒转：【+50%】/【+75%】
    d. 当选手成功通关结局boss战时，按照不同关卡计算：
        当选手成功通关【第一结局】时，分数计算【+200】、【+20%】
        当选手成功通关【第二结局】时，分数计算【+180】、【+30%】
        当选手成功通关【第三结局】时，分数计算【+160】、【+40%】
        当选手成功通关【第四结局】时，分数计算【+140】、【+50%】
        当选手在无有效爱恋的情况下，完成了【二三四连打】的结局时，最终分数计算【+15%】
5. 干员相关
    a. 招募相关
        当选手每进行一次四星及以下的干员招募，分数计算【+15】
        当选手每进行一次五星干员招募，分数计算【+25】
        当选手每进行一次六星干员招募，分数计算【+40】
        当选手每进行一次任意星级的临时招募，分数计算【+10】
    b. 升阶相关
        当选手每进行一次四星干员的升阶，分数计算【+10】
        当选手每进行一次五星干员的升阶，分数计算【+15】
        当选手每进行一次六星干员的升阶，分数计算【+20】
        当选手每进行一次临时招募干员的升阶，分数计算【+10】
    c. 错误抓取限制级干员时，有以下特殊说明：
        Ban位：当前轮次的赛事将被强行结算，并以最终分数的70%计算结果
        限一：三层前分数计算【-80】，第三层开始分数计算【-30%】
        限二：三层前分数计算【-60】，第三层开始分数计算【-25%】
        限三：三层前分数计算【-40】，第三层开始分数计算【-20%】
6. 藏品相关
    a. 当选手同时拥有三件【国王系列藏品】时，分数计算【+400】，国王系列藏品不单独计算分数
    b. 当选手获得没有特殊说明的藏品时，分数计算【+30】
    c. 所有结局必需藏品均不计入加减分
    d. 具体的藏品加分计算如下：
        获得以下藏品时，分数计算【+40】：所有【**之手】
        获得以下藏品时，分数计算【+50】：所有书本、安玛的爱
        获得以下藏品时，分数计算【+25%】：无垠赠礼
        获得以下藏品时，分数计算【+35%】：空间碎片、深度灼痕、坍缩之种
        获得以下藏品时，分数计算【-5%】：源石鸢尾花、古旧铸物、女妖之吻、宁静泉流、高卢银行支票、荆棘环
        获得以下藏品时，分数计算【-10%】：第二经济改革法、 “复仇者”、损坏的左轮弹巢、岩角号、银餐叉
        获得以下藏品时，分数计算【-15%】：空羽兽、立体艺术装置、迷迭香之拥、金酒之杯
        获得以下藏品时，分数计算【-25%】：大静谧、老蒲扇
`

const limit_rule = `1. 杯赛地图选定为【萨米N10】
2. 每位选手需要两人一队，分为【操作选手】和【运营选手】
3. 开局只能在【突击战术分队】【堡垒战术分队】【远程战术分队】【破坏战术分队】中选择一个分队进行，且后续干员选择不得以该分队图标的核心六星干员作为开局
4. 干员限制
    开局必须包含一位六星干员，且到第三层第一次战斗为止，不得精二该六星干员。若【招募组合】选择【随心所欲】时，则无视该规则
    Ban位：将【维什戴尔】【逻各斯】【令】【乌尔比安】列入ban位，不得选用
    限一（仅能选择一位干员）：塑心、黍、锏、引星棘刺、焰影苇草、所有拥有肉鸽模组的干员（不使用肉鸽模组则无此限制）
    限二（仅能选择两位干员）：玛恩纳、莱伊、奶羊、玛露西尔、麒麟夜刀
    限三（仅能选择三位干员）：提丰、伊内斯、莫斯提马、艾拉、妮芙、银灰
5. 选手在赛事开局不得有任何额外的收藏品或资源加成，例如热水壶
6. 每次进入商店，必须先存储两枚源石锭才可进行购买（若存储已达上限则无视此限制），在需要取出源石锭时，同一层商店至多只能取出八次源石锭（当选手进入树篱之途时，视为另一层）
7. 选手机制
    在赛事进行时，【操作选手】与【运营选手】之间不得有任何话语交流，两位选手需要分开发言
    【操作选手】只负责战斗环节中的所有操作，以及战斗结束时的奖励发放，包括普通关，特殊关，boss关等，并且在战斗时，只有该选手可以发言，【运营选手】不得有任何发言
    【运营选手】负责战斗环节以外所有的选择、行进等，商店也只能由该选手决定是否购物、“请”打折等，并且在战斗以外时，只有该选手可以发言，【操作选手】不得有任何发言
    当选手之间出现意见不同时，以当前拥有发言权的选手为主，另一位选手应当全程无条件配合
    赛事期间，【操作选手】不得查看本赛事相关规则，【运营选手】可随意查看并宣言相关本赛事规则的内容
    当【操作选手】成功通过第二结局的boss战时，【运营选手】将不再能查看本赛事相关规则  
    在进入第三层第一个事件前，选手可以提出与队友连线，讨论是否选择重新开启赛事，但重启次数每个轮次只有一次
    【操作选手】【运营选手】不得在两个轮次内选用同样的【开局分队】
8. 添加干员限制
    上一组选手拥有对下一组选手添加限制级干员的权利，限一一名，限二两名，限三三名
    第一组被添加的限制级干员，由最后一组的选手决定
    每组选手有权利不添加任何限制级干员
    在添加过后，赛事进行中的两名选手，可以在限二和限三级干员中，重复选择至多四名限制级干员
    没有被添加限制级干员时，选手在两个轮次内不得选用相同的限制级干员
9. 除非选手遭遇现实中突发事件，或违反部分规则，直至完成赛事为止不得停止
10. 在一轮次结束后，【操作选手】与【运营选手】的身份互换，再进行一次赛事，最终分数将取决两次分数的平均分
11. 错误抓取Ban位干员时，当前轮次的赛事将被强行结算，并以最终分数的70%计算结果
`

const props = {
  expandTrigger: 'hover' as const
}
</script>
