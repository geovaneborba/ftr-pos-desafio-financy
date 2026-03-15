import { Link, useLocation } from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import financyLogo from '@/assets/financy.svg';
import { cn } from '@/utils/utils';
import { getUsernameInitials } from '@/utils/get-username-initials';

import { BottomNav } from './bottom-nav';
import { useAuthStore } from '@/stores/auth-store';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Transações', href: '/dashboard/transactions' },
  { name: 'Categorias', href: '/dashboard/categories' }
];

export function Navbar() {
  const location = useLocation();
  const { user } = useAuthStore();

  const userNameInitials = user?.name ? getUsernameInitials(user.name) : '';

  return (
    <div>
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-12">
        <Link to="/dashboard">
          <img src={financyLogo} alt="Financy Logo" className="h-8 w-auto" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-sm text-gray-600 decoration-gray-600 transition-colors hover:underline',
                location.pathname === item.href
                  ? 'text-brand-base decoration-brand-base font-medium'
                  : 'text-gray-600'
              )}
            >
              {item.name}
            </Link>
          ))}
        </ul>

        <Link to="/dashboard/profile">
          <Avatar>
            <AvatarFallback className="text-brand-base bg-green-light text-sm font-medium uppercase">
              {userNameInitials}
            </AvatarFallback>
          </Avatar>
        </Link>

        <BottomNav />
      </nav>
    </div>
  );
}
