import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Route } from 'react-router-dom'
import Player from '@containers/demo/player'

const styles = require('./index.scss')

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <AppBar className={styles.header} position="static">
          <label className={styles.slug}>wait!</label>
        </AppBar>
        <main className={styles.main}>
          <nav className={styles.menu}>
            <a href="/post" className={styles.menuItem}>
              Poetry
            </a>
            <a href="/demo" className={styles.menuItem}>
              Demo
            </a>
          </nav>
          <div className={styles.content}>
            <Route path="player" exact component={Player} />
          </div>
          <aside className={styles.aside}></aside>
        </main>
      </div>
    </div>
  )
}

export default Home
