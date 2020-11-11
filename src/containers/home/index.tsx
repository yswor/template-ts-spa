import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { RouteType } from '@routes/index'

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
              Post
            </a>
            <a href="/demo" className={styles.menuItem}>
              Demo
            </a>
          </nav>
          <div className={styles.content}></div>
          <aside className={styles.aside}></aside>
        </main>
      </div>
    </div>
  )
}

export default Home
