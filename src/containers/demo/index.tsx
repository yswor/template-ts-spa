import { RouteType } from '@routes/index'
import React from 'react'
import { Link, Route, useRouteMatch } from 'react-router-dom'

const styles = require('./index.scss')

const Demo: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const match = useRouteMatch()

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to="/" className={styles.link}>
            HOME
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to={`${match.url}/countdown`} className={styles.link}>
            COUNTDOWN
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to={`${match.url}/player`} className={styles.link}>
            PLAYER
          </Link>
        </li>
      </ul>
      <main>
        {routes.map(({ path, ComponentName, key, exact }) => {
          return <Route path={path} key={key} component={ComponentName} exact={exact} />
        })}
      </main>
    </div>
  )
}

export default Demo
