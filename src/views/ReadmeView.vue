<template>
  <div class="about-container">
    <h1>网站说明</h1>
    <p>
      <b>kissnab的明日方舟工具箱</b> 是由作者
      <b>xinghuan22</b>
      开发和维护的明日方舟相关工具集合网站，最初的目的是为了减轻群友举办比赛时的计算工作量。
    </p>
    <h2>已收录工具</h2>
    <ul>
      <li>集成战略杯赛计算器（目前已收录三个）</li>
      <ul>
        <li>骑士杯计算器（水月骑士杯的规则已遗失，不可考）</li>
        <li>闹谭杯计算器</li>
        <li>萨构杯2计算器</li>
      </ul>
    </ul>
    <h2>未来计划</h2>
    <p>
      未来会根据作者的兴趣，逐步扩充更多明日方舟相关的小工具和功能，欢迎持续关注和来我的<a
        class="link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/xinghuan22/arknights-calculator"
        >Github</a
      >提出建议！
    </p>
    <p style="margin-top: 2em; color: #888">本站所有工具仅供学习与娱乐使用，与鹰角网络无关。</p>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}
h2 {
  margin-top: 1.5em;
  font-size: 1.2em;
  color: #409eff;
}
ul > ul {
  margin-left: -1em;
  list-style-type: circle;
}

.link {
  color: #409eff;
}

.link:hover {
  text-decoration: underline;
  background-color: aliceblue;
}
</style>
