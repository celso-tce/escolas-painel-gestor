import React from 'react';
import UserDropdown from "../UserDropdown";

type AdminNavbarProps = {
  currentPage?: string;
};

const AdminNavbar: React.FC<AdminNavbarProps> = (props) => {
  return (
    <>
      {/* Navbar */}
      <nav
        className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap
          md:justify-start flex items-center py-4"
      >
        <div
          className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap
            md:px-10 px-4"
        >
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            {props.currentPage ?? 'Dashboard'}
          </a>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex text-white">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default React.memo(AdminNavbar);
