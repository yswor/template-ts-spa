import React from 'react'

const styles = require('./index.scss')

const Post: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>我用什么才能留住你？</h1>
      <p className={styles.p}>我给你瘦落的街道、绝望的落日、荒郊的月亮。</p>
      <p className={styles.p}>我给你一个久久地望着孤月的人的悲哀。</p>
      <p className={styles.p}>
        我给你我已死去的祖辈，后人们用大理石祭奠的先魂：我父亲的父亲，阵亡于布宜诺斯艾利斯的边境，两颗子弹射穿了他的胸膛，死的时候蓄着胡子，尸体被士兵们用牛皮裹起；我母亲的祖父——那年才二十四岁——在秘鲁率领三百人冲锋，如今都成了消失的马背上的亡魂。
      </p>
      <p className={styles.p}>
        我给你我的书中所能蕴含的一切悟力，以及我生活中所能有的男子气概和幽默。
      </p>
      <p className={styles.p}>我给你一个从未有过信仰的人的忠诚。</p>
      <p className={styles.p}>
        我给你我设法保全的我自己的核心——不营字造句，不和梦交易，不被时间、欢乐和逆境触动的核心。
      </p>
      <p className={styles.p}>我给你早在你出生前多年的一个傍晚看到的一朵黄玫瑰的记忆。</p>
      <p className={styles.p}>我给你关于你生命的诠释，关于你自己的理论，你的真实而惊人的存在。</p>
      <p className={styles.p}>
        我给你我的寂寞、我的黑暗、我心的饥渴；我试图用困惑、危险、失败来打动你。
      </p>
    </div>
  )
}

export default Post
