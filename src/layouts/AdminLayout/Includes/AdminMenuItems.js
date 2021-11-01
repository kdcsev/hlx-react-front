import {
  ADMIN_LEVEL_ALL,
  ADMIN_LEVEL_SUPERADMIN,
  ROUTE_ADMIN_ANNOUNCEMENT,
  ROUTE_ADMIN_COUPON,
  ROUTE_ADMIN_FEED,
  ROUTE_ADMIN_LICESES,
  ROUTE_ADMIN_PAYMENTS,
  ROUTE_ADMIN_PROFILE,
  ROUTE_ADMIN_RANK,
  ROUTE_ADMIN_STATS,
  ROUTE_ADMIN_TEAM,
  ROUTE_ADMIN_TICKET,
  ROUTE_ADMIN_USERS,
  ROUTE_ADMIN_WITHDRAWS,
  ROUTE_LOGIN,
} from "navigation/CONSTANTS";


export const ADMIN_MENU_ITEMS = [
  {
    route: ROUTE_ADMIN_USERS,
    icon: "mdi mdi-account-multiple",
    title: "Users",
    level: ADMIN_LEVEL_ALL,
  },
  {
    route: ROUTE_ADMIN_PROFILE,
    icon: "mdi mdi-account",
    title: "Profile",
    level: ADMIN_LEVEL_SUPERADMIN,
  },
  {
    route: ROUTE_ADMIN_LICESES,
    icon: "mdi mdi-format-list-bulleted-type",
    title: "Licenses",
    level: ADMIN_LEVEL_ALL,
  },
  {
    route: ROUTE_ADMIN_PAYMENTS,
    icon: "mdi mdi-currency-usd",
    title: "Payments",
    level: ADMIN_LEVEL_ALL,
  },
  {
    route: ROUTE_ADMIN_WITHDRAWS,
    icon: "mdi mdi-wallet",
    title: "Withdraw",
    level: ADMIN_LEVEL_ALL,
  },
  {
    route: ROUTE_ADMIN_STATS,
    icon: "mdi mdi-chart-bar",
    title: "Company Stats",
    level: ADMIN_LEVEL_SUPERADMIN,
  },
  {
    route: ROUTE_ADMIN_TEAM,
    icon: "mdi mdi-sitemap",
    title: "MLM Tree",
    level: ADMIN_LEVEL_ALL,
  },
  {
    route: ROUTE_ADMIN_RANK,
    icon: "mdi mdi-buffer",
    title: "Rank",
    level: ADMIN_LEVEL_ALL,
  },
  {
    route: ROUTE_ADMIN_TICKET,
    icon: "mdi mdi-forum",
    title: "Tickets",
    level: ADMIN_LEVEL_ALL,
  },
  {
    route: ROUTE_ADMIN_COUPON,
    icon: "mdi mdi-code-not-equal-variant",
    title: "Coupon System",
    level: ADMIN_LEVEL_SUPERADMIN,
  },
  {
    route: ROUTE_ADMIN_ANNOUNCEMENT,
    icon: "mdi mdi-comment-alert",
    title: "Announcement",
    level: ADMIN_LEVEL_SUPERADMIN,
  },
  {
    route: ROUTE_ADMIN_FEED,
    icon: "mdi mdi-rss-box",
    title: "News Feed",
    level: ADMIN_LEVEL_SUPERADMIN,
  },
];
