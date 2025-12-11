import {
  ROLE_MANAGER,
  ROLE_SUPER_ADMIN,
  ROLE_USER,
} from "../utils/constants/Roles";

export const getMenuData = (role) => [
  {
    id: 1,
    name: "Dashboard",
    route: "/",
    access: [ROLE_SUPER_ADMIN, ROLE_MANAGER, ROLE_USER],
  },
  {
    id: 3,
    name: "Task",
    children: [
      {
        id: 4,
        name: "List",
        route: "/task/list",
        access: [ROLE_SUPER_ADMIN, ROLE_MANAGER, ROLE_USER],
      },
      {
        id: 4,
        name: "Assigned List",
        route: "/task/assigned/list",
        access: [ROLE_USER],
      },
      {
        id: 5,
        name: "Create",
        route: "/task/create",
        access: [ROLE_SUPER_ADMIN, ROLE_MANAGER, ROLE_USER],
      },
    ],
    access: [ROLE_SUPER_ADMIN, ROLE_MANAGER, ROLE_USER],
  },
];
