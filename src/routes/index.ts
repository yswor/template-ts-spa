import Home from '@containers/home'
import Post from '@containers/post'
import Demo from '@containers/demo'
import Countdown from '@containers/demo/countdown'
import Player from '@containers/demo/player'

export type RouteType = {
  key: string
  path: string
  ComponentName: any
  exact?: boolean
  routes?: RouteType[]
}

const routes: RouteType[] = [
  {
    key: 'post',
    path: '/post',
    ComponentName: Post,
  },
  {
    key: 'demo',
    path: '/demo',
    ComponentName: Demo,
    routes: [
      {
        key: 'countdown',
        path: '/demo/countdown',
        ComponentName: Countdown,
        exact: true,
      },
      {
        key: 'player',
        path: '/demo/player',
        ComponentName: Player,
        exact: true,
      },
    ],
  },
  {
    key: 'home',
    path: '/',
    ComponentName: Home,
  },
]

export default routes
