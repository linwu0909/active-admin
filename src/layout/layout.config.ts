import { Role } from "../type";
import BannerManage from "../pages/bannerManage/bannerManage";
import ActivityManage from "../pages/activityManage/activityManage";
import BackendUserManage from "../pages/backendUserManage/backendUserManage";
import RegisterUserManage from "../pages/registerUserManage/registerUserManage";
import { IMenu } from "./layout.type";
/**
 * 存放layout页面的相关配置
 */
export const getMenus = () => [
    {
      key: "/bannerManage",
      label: "轮播图管理",
      roles: [Role.ACTIVITYMANAGE],
      component: BannerManage
    },
    {
      key: "/activityManage",
      label: "活动管理",
      roles: [Role.ACTIVITYMANAGE],
      component: ActivityManage
    },
    {
      key: "/userManage",
      label: "用户管理",
      roles: [Role.USERMANAGE],
      children: [
        {
            key: '/userManage/registerUserManage',
            label: '注册用户管理',
            roles: [Role.USERMANAGE],
            component: RegisterUserManage
        },
        {
            key: '/userManage/backendUserManage',
            label: '后台用户管理',
            roles: [Role.USERMANAGE],
            component: BackendUserManage
        }
      ]
    },
  ] as IMenu[];