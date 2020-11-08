const routes = [
  {
    name: 'index',
    path: '/',
    component: require('@containers/home/index').default,
    exact: true,
  },
  {
    name: 'home',
    path: '/home',
    component: require('@containers/home/index').default,
    exact: true,
  },
  {
    name: 'post',
    path: '/post',
    component: require('@containers/post/index').default,
    exact: true,
  },
  {
    name: 'demo',
    path: '/demo',
    component: require('@containers/demo/index').default,
    exact: true,
  },
]

export default routes
