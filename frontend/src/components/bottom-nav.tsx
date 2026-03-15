import { cn } from '@/utils/utils';
import { ArrowLeftRight, LayoutDashboard, Tag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    label: 'Transações',
    href: '/dashboard/transactions',
    icon: ArrowLeftRight
  },
  { label: 'Categorias', href: '/dashboard/categories', icon: Tag },
  { label: 'Perfil', href: '/dashboard/profile', icon: User }
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bg-card border-border safe-bottom fixed inset-x-0 bottom-0 z-50 border-t md:hidden">
      <div className="flex items-stretch justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors"
              to={tab.href}
            >
              <Icon
                className={cn(
                  `size-5`,
                  tab.href === location.pathname ? 'text-brand-base' : ''
                )}
              />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
