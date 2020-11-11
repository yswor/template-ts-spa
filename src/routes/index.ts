import Home from '@containers/home'
import Post from '@containers/post'
import Demo from '@containers/demo'
import Countdown from '@containers/demo/countdown'
import Player from '@containers/demo/player'
import PageNotFound from '@containers/404'

export type RouteType = {
  key: string
  path: string
  component: any
  exact?: boolean
  routes?: RouteType[]
}

const routes: RouteType[] = [
  {
    key: 'home',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    key: 'post',
    path: '/post',
    component: Post,
    exact: true,
  },
  {
    key: 'demo',
    path: '/demo',
    component: Demo,
    routes: [
      {
        key: 'countdown',
        path: '/demo/countdown',
        component: Countdown,
        exact: true,
      },
      {
        key: 'player',
        path: '/demo/player',
        component: Player,
        exact: true,
      },
    ],
  },
  {
    key: '404',
    path: '*',
    component: PageNotFound,
  },
]

export default routes
