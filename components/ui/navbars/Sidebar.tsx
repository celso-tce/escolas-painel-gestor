import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type SidebarProps = {
  projectTitle: string;
  navbarGroups: Array<NavbarGroup>;
};

type NavbarGroup = {
  label: string;
  items: Array<{
    icon?: IconProp;
    label: string;
    url: string;
  }>;
};

// const bgColor = 'bg-tce-blue-5';
const bgColor = 'bg-white';
// const dark = true;
const dark = false;

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { projectTitle, navbarGroups } = props;
  const [collapseShow, setCollapseShow] = React.useState('hidden');
  const router = useRouter();

  const collapseHeader = (
    // <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
    <div className="md:min-w-full md:hidden block">
      <div className="flex flex-wrap">
        <div className="w-6/12">
          <Link href="/">
            <a
              href="#"
              className={'md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap text-sm'
                + ' uppercase font-bold p-4 px-0'
                + (dark ? ' text-white' : ' text-slate-600')}
            >
              {projectTitle}
            </a>
          </Link>
        </div>
        <div className="w-6/12 flex justify-end">
          <button
            type="button"
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            onClick={() => setCollapseShow("hidden")}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );

  const navigations = (<>
    {navbarGroups.map((group, index) => {
      return <_NavigationGroup key={index} router={router} navbarGroup={group} />;
    })}
  </>);

  return (
    <nav
      className={'md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto'
        + ' md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center'
        + ' justify-between relative md:w-64 z-10 py-4 px-6 ' + bgColor}
      >
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <button
          className={'cursor-pointer opacity-50 md:hidden px-3 py-1 text-xl leading-none'
            + ' bg-transparent rounded border border-solid border-transparent'
            + (dark ? ' text-white' : ' text-black')}
          type="button"
          onClick={() => setCollapseShow('m-2 py-3 px-6 ' + bgColor)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link href="/">
          <a
            className={'md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap text-sm'
              + 'uppercase font-bold p-4 px-0'
              + (dark ? ' text-white' : ' text-slate-600')}
          >
            {projectTitle}
          </a>
        </Link>
        <ul className="md:hidden items-center flex flex-wrap list-none">
          <li className="inline-block relative">
            Notifications...
          </li>
          <li className="inline-block relative">
            User...
          </li>
        </ul>
        <div className={"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " + collapseShow}>
          {collapseHeader}
          {navigations}
        </div>
      </div>
    </nav>
  );
};

const _NavigationGroup: React.FC<{
  router: NextRouter;
  navbarGroup: NavbarGroup;
}> = React.memo((props) => {
  const { router, navbarGroup } = props;

  return (<>
    {/* Divider */}
    <hr className={'my-4 md:min-w-full' + (dark ? ' opacity-0' : '')} />

    {/* Heading */}
    <h6
      className={'md:min-w-full text-xs uppercase font-bold block pt-1 pb-4 no-underline'
        + (dark ? ' text-slate-200' : ' text-slate-500')}
    >
      {navbarGroup.label}
    </h6>

    {/* Navigation */}
    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
      {navbarGroup.items.map((item, index) => {
        const isCurrent = router.pathname.indexOf(item.url) !== -1;

        return (
          <li key={index} className="items-center">
            <Link href={item.url}>
              <a
                className={'text-xs uppercase py-3 font-bold block'
                  + (isCurrent
                    ? (dark
                        ? ' text-tce-yellow-4 hover:text-tce-yellow-3'
                        : ' text-sky-500 hover:text-sky-600')
                    : (dark
                        ? ' text-slate-200 hover:text-white'
                        : ' text-slate-700 hover:text-slate-500'))
                }
              >
                {item.icon && (
                  <FontAwesomeIcon icon={item.icon} className={'mr-2 text-sm'
                    + (isCurrent
                      ? ' opacity-75-'
                      : ' text-slate-300')
                  } />
                )}
                {" "}
                {item.label}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  </>);
});

export default React.memo(Sidebar);
