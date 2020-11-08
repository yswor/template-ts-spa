import React, { Component } from 'react'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import AppBar from '@material-ui/core/AppBar'
import Player from '@components/player'

const styles = require('./index.scss')

class Home extends Component {
  render() {
    return (
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
            {new Array(14).fill(1).map((e, i) => (
              <Card className={styles.card} elevation={3} key={i.toString()}>
                <CardContent>nothing to say...</CardContent>
              </Card>
            ))}
          </div>
          <aside className={styles.aside}>
            <Player />
          </aside>
        </main>
      </div>
    )
  }
}

export default Home
