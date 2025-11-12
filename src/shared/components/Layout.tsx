import { Outlet, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Toaster } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ErrorBoundary } from '@shared/components';
import { ErrorFallback } from '@/shared/components/ErrorFallback';

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
                  clsx(
                    'px-4 py-2',
                    'rounded-lg',
                    'transition-colors duration-150',
                    'font-medium',
                    {
                      'text-gray-400 cursor-not-allowed': isPending,
                      'bg-indigo-600 text-white hover:bg-indigo-500': isActive,
                      'text-gray-300 hover:text-white hover:bg-gray-700':
                        !isActive && !isPending,
                    }
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ScrollArea className={clsx('px-8', 'pb-16', 'flex-1 overflow-y-auto')}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <div className="flex flex-col h-full">
            <Outlet />
          </div>
        </ErrorBoundary>
      </ScrollArea>
      <Toaster richColors position="top-center" />
    </div>
  );
};
export default Layout;
