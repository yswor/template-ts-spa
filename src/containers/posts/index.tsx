import { RouteType } from '@routes/index'
import React, { useCallback } from 'react'
import { Link, Route, RouteComponentProps, Switch } from 'react-router-dom'

const styles = require('./index.scss')

interface Props extends RouteComponentProps {
  routes: RouteType[]
}

const list = [
  {
    id: 1,
    name: '诗歌',
  },
]

const Posts: React.FC<Props> = ({ history, match, routes }) => {
  const goBack = useCallback(() => {
    history.goBack()
  }, [history])

  return (
    <div className="page">
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navBtn}>
            Home
          </Link>
        </nav>
        <main className={styles.main}>
          <div className={styles.menu}>
            {list.map(e => (
              <Link
                className={styles.menuItem}
                to={`${match.url}/${e.id}`}
                key={`${e.id}_${e.name}`}
              >
                {e.name}
              </Link>
            ))}
          </div>
          <div className={styles.content}>
            <Switch>
              {routes.map(({ path, component, key, exact }) => (
                <Route path={path} key={key} component={component} exact={exact} />
              ))}
            </Switch>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Posts
