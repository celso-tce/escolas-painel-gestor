import { faCaretDown, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { userRoles } from "../../lib/escolas/enums";
import { Utils } from "../../lib/utils";
import { UserServiceContext } from "../../pages/_app";

type UserDropdownProps = {};

const UserDropdown: React.FC<UserDropdownProps> = (props) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const userService = React.useContext(UserServiceContext);

  const user = React.useMemo(() => {
    return userService.loadUser();
  }, [userService]);

  const toggleDropdown = React.useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  const dropdown = React.useMemo(() => {
    if (!user || !showDropdown)
      return null;

    return (
      <div
        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1
          ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {userRoles.map((userRole, index) => (
            <a
              key={index}
              onClick={(e) => {
                e.preventDefault();
                userService.saveUser({
                  ...user,
                  role: userRole,
                });

                toggleDropdown();
              }}
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
            >
              Simular: {Utils.userRoleLabel(userRole)}
            </a>
          ))}
        </div>
        <div className="py-1" role="none">
          <a href="/perfil" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">
            Meu Perfil
          </a>
        </div>
        <div className="py-1" role="none">
          <form method="POST" action="#" role="none">
            <button type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
              role="menuitem" id="menu-item-3">Sair</button>
          </form>
        </div>
      </div>
    );
  }, [user, showDropdown, toggleDropdown, userService]);

  if (user === null) {
    return (
      null
    );
  }

  return (
    <div className="bg-white shadow rounded px-2 py-1 text-xs">
      <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
        <div className="grow">
          <div className="text-slate-800 font-medium flex items-center mb-1">
            <FontAwesomeIcon icon={faUser} size="sm" fixedWidth />&nbsp;
            {Utils.userRoleLabel(user.role)}
          </div>
          <div className="text-sky-700 flex items-center">
            <FontAwesomeIcon icon={faKey} size="sm" fixedWidth />&nbsp;
            {user.email}
          </div>
        </div>

        <div className="pl-2 text-sky-800">
          <FontAwesomeIcon icon={faCaretDown} size="lg" fixedWidth />
        </div>
      </div>

      {dropdown}
    </div>
  );
};

export default React.memo(UserDropdown);
