import{r as h,d as L,u as O,c as m,a as d,b as s,e as o,w as c,n as P,E as F,f as S,g as G,o as v,T as R,F as k,h as B,i as E,j,k as x,l as q,m as Q,p as A,q as H,s as J,t as K,v as W,_ as X}from"./404-w24tUP99.js";import{D as Y}from"./DialogInfo-pbLXOdIe.js";/* empty css                        */const f=h(100),g=h(1);let p=!1;const i=h([{score:100,behavior:"",id:Math.random().toString(36).slice(-8),boss_fight:!1,value:[],special_cadres_Value:[]}]),Z=a=>{w(a)},ee=a=>{w(a)},w=a=>{let n=100;a>0&&(n=i.value[a-1].score);for(let u=a;u<i.value.length;u++){const e=i.value[u];e.score=n;const r=e.value,l=r[r.length-1];e.behavior=l,r[r.length-2]=="boss_three"?(e.score+=100,e.score*=1+l,p=!0):r[r.length-2]=="boss_final"?(e.score+=Math.trunc(l),e.score*=l-Math.trunc(l)+1):r[r.length-2]=="error_patch"?(l=="ban"&&(g.value=.7),l=="limit_one"&&(p?e.score*=1-.3:e.score-=80),l=="limit_two"&&(p?e.score*=1-.25:e.score-=60),l=="limit_three"&&(p?e.score*=1-.2:e.score-=40)):l=="special_cadres"?(e.boss_fight=!0,e.score+=e.special_cadres_Value.length*150):l<1?e.score*=l+1:l>1&&(e.score+=l),i.value[u]=e,n=e.score}f.value=n},le=a=>{let n=100;a>0&&(n=i.value[a-1].score);const u={score:n,behavior:"",id:Math.random().toString(36).slice(-8),boss_fight:!1,value:[],special_cadres_Value:[]};i.value.splice(a+1,0,u)},ae=a=>{i.value.splice(a,1)},se=()=>{i.value=[{score:100,behavior:"",id:Math.random().toString(36).slice(-8),boss_fight:!1,value:[],special_cadres_Value:[]}],f.value=100,g.value=1},te=[{value:40,label:"6星干员（+40）"},{value:25,label:"5星干员（+25）"},{value:15,label:"4星及以下干员（+15）"},{value:10,label:"临时招募（+10）"},{value:"error_patch",label:"错误抓取",children:[{value:"ban",label:"Ban位干员（最后结算*0.7）"},{value:"limit_one",label:"限一干员（三层前分数计算-80，第三层开始分数计算-30%）"},{value:"limit_two",label:"限二干员（三层前分数计算-60，第三层开始分数计算-25%）"},{value:"limit_three",label:"限三干员（三层前分数计算-40，第三层开始分数计算-20%）"}]}],oe=[{value:20,label:"6星干员（+20）"},{value:15,label:"5星干员（+15）"},{value:10,label:"4星及以下干员（+10）"},{value:10,label:"临时招募（+10）"}],ce=[{value:30,label:"普通藏品（+30）"},{value:40,label:"**之手（+40）"},{value:50,label:"书本、安玛的爱（+50）"},{value:.25,label:"无垠赠礼（+25%）"},{value:.35,label:"空间碎片、深度灼痕、坍缩之种（+35%）"},{value:-.05,label:"源石鸢尾花、古旧铸物、女妖之吻、宁静泉流、高卢银行支票、荆棘环（-5%)"},{value:-.1,label:'第二经济改革法、"复仇者"、损坏的左轮弹巢、岩角号、银餐叉（-10%)'},{value:-.15,label:"空羽兽、立体艺术装置、迷迭香之拥、金酒之杯（-15%)"},{value:-.25,label:"大静谧、老蒲扇（-25%)"},{value:400,label:"凑齐三件国王系列藏品（+400）"}],ne=[{value:20,label:"普通作战（+20）"},{value:"event_fight",label:"事件作战",children:[{value:15,label:"+15"},{value:25,label:"+25"},{value:35,label:"+35"},{value:50,label:"+50"}]},{value:50,label:"突袭作战（+50）"},{value:.2,label:"高难度突袭作战（+20%）"},{value:"boss_three",label:"三层BOSS",children:[{value:.5,label:"自然之怒（+100，+50%）"},{value:.6,label:"利刃所指、新部族（+100，+60%）"},{value:.7,label:"呼吸（+100，+70%）"},{value:.75,label:"大地醒转（+100，+75%）"},{value:.8,label:"夺树者（+100，+80%）"}]},{value:"boss_final",label:"结局boss",children:[{value:200.2,label:"巍峨银凇（+200，+20%）"},{value:180.3,label:"萨米之熵（+180，+30%）"},{value:160.4,label:"园丁（+160，+40%）"},{value:140.5,label:"时光之沙（+140，+50%）"}]},{value:"special_cadres",label:"携带特殊干员进行boss战（每个特殊干员+150）"}],re=["弑君者","止颂","伺夜","琳琅诗怀雅","淬羽赫默"],ie=[{value:"patch_cadres",label:"招募干员",children:te},{value:"update_cadres",label:"进阶干员",children:oe},{value:"patch_collections",label:"获得藏品",children:ce},{value:"fights",label:"作战",children:ne}],ue={class:"sami"},_e={class:"cal-item"},ve={class:"dimension"},de={class:"option"},be=`1. 每位选手开局拥有100分初始分数
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
`,me=`1. 杯赛地图选定为【萨米N10】
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
`,pe=L({__name:"SamiCalView",setup(a){const n=O();function u(){return new URL("/arknights-calculator/assets/bg_sami-D5xDQtBG.png",import.meta.url).href}const e={expandTrigger:"hover"};return(r,l)=>{const D=F,I=q,V=Q,M=W,T=A,U=S("Plus"),C=H,y=J,z=S("Delete"),N=K,$=G;return v(),m("div",{class:P(["sami-cal",{dark:o(n)}])},[d("div",ue,[s(D,{src:u()},null,8,["src"])]),d("div",_e,[s(Y,{totalScore:o(f)*o(g),digit_rule:be,limit_rule:me,readme:"本计算器是专用于闹谭杯的计算器，只计算分数性规则，不考虑无分数的限制性规则。",reset:o(se)},null,8,["totalScore","reset"]),s($,{style:{"min-height":"0"},class:"item-box"},{default:c(()=>[s(R,{name:"list","enter-active-class":"animate__animated animate__slideInRight","leave-active-class":"animate__animated animate__slideOutLeft"},{default:c(()=>[(v(!0),m(k,null,B(o(i),(_,b)=>(v(),m("div",{key:_.id,class:"item-box"},[d("div",ve,[(v(),E(I,{modelValue:_.value,"onUpdate:modelValue":t=>_.value=t,key:_.id,options:o(ie),props:e,class:"cascader",onChange:t=>o(Z)(b)},null,8,["modelValue","onUpdate:modelValue","options","onChange"])),d("div",{class:"special-cadres",style:j({visibility:_.boss_fight?"visible":"hidden"})},[s(V,{class:"mx-1",size:"large",style:{flex:"1","text-align":"right","margin-right":"1%"}},{default:c(()=>[x("携带干员")]),_:1}),s(T,{modelValue:_.special_cadres_Value,"onUpdate:modelValue":t=>_.special_cadres_Value=t,"collapse-tags":"","collapse-tags-tooltip":"",multiple:"",placeholder:"Select",style:{flex:"2"},onChange:t=>o(ee)(b)},{default:c(()=>[(v(!0),m(k,null,B(o(re),t=>(v(),E(M,{key:t,label:t,value:t},null,8,["label","value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"]),s(V,{class:"mx-1",size:"large",style:{flex:"1","margin-left":"1%"}},{default:c(()=>[x("进行boss战")]),_:1})],4),d("div",de,[s(y,{type:"primary",circle:"",onClick:t=>o(le)(b)},{default:c(()=>[s(C,null,{default:c(()=>[s(U)]),_:1})]),_:2},1032,["onClick"]),s(N,{title:"确认删除?",onConfirm:t=>o(ae)(b)},{reference:c(()=>[s(y,{type:"primary",circle:""},{default:c(()=>[s(C,null,{default:c(()=>[s(z)]),_:1})]),_:1})]),_:2},1032,["onConfirm"])])])]))),128))]),_:1})]),_:1})])],2)}}}),Ve=X(pe,[["__scopeId","data-v-33379a45"]]);export{Ve as default};
