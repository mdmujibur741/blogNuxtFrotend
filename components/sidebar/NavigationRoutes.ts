export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
    
  },
  routes: [
    {
      name: '/admin',
      displayName: 'dashboard',
      meta: {
        icon: 'dashboard',
      },
    },
    // {
    //   name: '/admin/user',
    //   displayName: 'Users',
    //   meta: {
    //     icon: 'group',
    //   },
    // },

    {
      name: '/admin/user',
      displayName: 'User',
      meta: {
        icon: 'dashboard',
      },
      children: [
        {
          name: '/admin/user',
          displayName: 'User List',
        },
        {
          name: '/admin/user/create',
          displayName: 'User Create',
        },
      ],
    },

    {
      name: '/admin/category',
      displayName: 'Category',
      meta: {
        icon: 'dashboard',
      },
      children: [
        {
          name: '/admin/category',
          displayName: 'Category',
        },
        {
          name: '/admin/category/create',
          displayName: 'Category Create',
        },
      ],
    },
   
    {
      name: '/admin/blog',
      displayName: 'blog',
      meta: {
        icon: 'dashboard',
      },
      children: [
        {
          name: '/admin/blog',
          displayName: 'Blog List',
        },
        {
          name: '/admin/blog/create',
          displayName: 'Blog Create',
        },
      ],
    },
    {
      name: 'settings',
      displayName: 'settings',
      meta: {
        icon: 'dashboard',
      },
    },
  ] as INavigationRoute[],
}
