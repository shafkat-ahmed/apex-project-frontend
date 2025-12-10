import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getMenuData } from "../../../data/menuData";
import { logout } from "../../../store/actions/authAction";
import { ROLE_SUPER_ADMIN, ROLE_USER } from "../../../utils/constants/Roles";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../utils/daynamicNavigation";

const SidebarMenu = () => {
  const route = useLocation();
  const dispatch = useDispatch();

  const { user, role } = useSelector((state) => state.auth);

  const [menuItems, setMenuItems] = useState(getMenuData());

  const manageAccount = [
    {
      id: 3,
      name: "Logout",
      route: "/login",
      icon: "flaticon-logout",
      access: [ROLE_SUPER_ADMIN, ROLE_USER],
    },
  ];

  // Helper function to recursively render menu items
  const renderItem = (item) => {
    const hasRoleAccess = item?.access?.includes(role);
    const isActive = item.route
      ? isSinglePageActive(item.route, route.pathname)
      : isParentPageActive(item.children, route.pathname);

    return hasRoleAccess ? (
      <li className={`treeview ${isActive ? "active" : ""}`} key={item.id}>
        {item.children ? (
          <>
            <a data-bs-toggle="collapse" href={`#menu-${item.id}`}>
              <i className="fa fa-circle"></i> <span>{item.name}</span>
              <i className="fa fa-angle-down pull-right"></i>
            </a>
            <ul className="treeview-menu collapse" id={`menu-${item.id}`}>
              {item.children.map((child) => renderItem(child))}
            </ul>
          </>
        ) : (
          <Link to={item.route}>
            <a>
              <i className="fa fa-circle"></i> <span>{item.name}</span>
            </a>
          </Link>
        )}
      </li>
    ) : null;
  };

  useEffect(() => {
    setMenuItems(getMenuData());
  }, [role]);

  return (
    <>
      <ul className="sidebar-menu">
        <div className="title color-white role-title text-center">
          {/*<span> <h1 className="color-white">{userInfo?.name}</h1> </span>*/}
          <span>
            <i className="fa fa-user"></i>
            {user?.user_name} <br />
            {role}
          </span>
        </div>
        {/* End Main */}

        {/* Dynamically render menu items */}
        {menuItems.map((item) => renderItem(item))}

        <div className="title role-title manage-account mt-0">
          <span>Manage Account</span>
          <ul className="manage-account-logout">
            {manageAccount.map((item) => (
              <li
                className={
                  isSinglePageActive(item.route, route.pathname) ? "active" : ""
                }
                key={item.id}
                onClick={() => item.name == "Logout" && dispatch(logout())}
              >
                <Link to={item.route}>
                  <a>
                    <i className={item.icon}></i> <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </>
  );
};

export default SidebarMenu;
