import { Outlet, NavLink } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import clsx from 'clsx';

const navLinks = [
  { to: '/cats', label: 'Cats' },
  { to: '/breeds', label: 'Breeds' },
  { to: '/favourites', label: 'Favourites' },
];

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 p-4 h-16">
        <ul className="flex space-x-4 text-white">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive, isPending }) =>
                  clsx('px-2 py-1 transition-colors duration-150', {
                    'text-gray cursor-not-allowed': isPending,
                    'border-solid border-b border-indigo-500 font-semibold':
                      isActive,
                    'hover:text-gray-300': !isActive && !isPending,
                  })
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ScrollArea className={clsx('px-8', 'pb-16', 'flex-1 overflow-y-auto')}>
        <Outlet />
      </ScrollArea>
    </div>
  );
};
export default Layout;
