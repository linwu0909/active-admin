/**
 * 存放layout页面的相关配置
 */
export const menus = [
    {
      key: "/bannerManage",
      label: "轮播图管理",
    },
    {
      key: "/activityManage",
      label: "活动管理",
    },
    {
      key: "/userManage",
      label: "用户管理",
      children: [
        {
            key: '/userManage/registerUserManage',
            label: '注册用户管理'
        },
        {
            key: '/userManage/backendUserManage',
            label: '后台用户管理'
        }
      ]
    },
  ]