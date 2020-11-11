import React, { useCallback, useEffect, useRef, useState } from 'react'

const styles = require('./index.scss')

const Countdown: React.FC = () => {
  return (
    <div className={styles.circle}>
      <div className={styles.circleLeft}>
        <span className={styles.circleLeftCover}></span>
      </div>
      <div className={styles.circleRight}>
        <span className={styles.circleRightCover}></span>
      </div>
    </div>
  )
}

export default Countdown
