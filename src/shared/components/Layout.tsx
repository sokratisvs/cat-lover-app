import { Outlet, NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navLinks = [
  { to: '/cats', label: 'Cats' },
  { to: '/breeds', label: 'Breeds' },
  { to: '/favourites', label: 'Favourites' },
];

const Layout = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
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
      <div className="my-8" />
      <div
        className={clsx(
          'grid',
          'grid-cols-1',
          'sm:grid-cols-2',
          'md:grid-cols-3',
          'lg:grid-cols-4',
          'xl:grid-cols-5',
          'gap-4',
          'justify-items-center',
          'items-center'
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
