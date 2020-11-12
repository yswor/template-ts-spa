import Player from '@components/player'
import React from 'react'
import { Link } from 'react-router-dom'

const styles = require('./index.scss')

const Home: React.FC = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav className={styles.menu}>
          <Link to="/demo" className={styles.menuItem}>
            Demo
          </Link>
          <Link to="/post" className={styles.menuItem}>
            Post
          </Link>
        </nav>
        <div className={styles.content}>
          <Player />
        </div>
      </main>
    </div>
  )
}

export default Home
