import { Outlet } from 'react-router-dom';

import financyImage from '@/assets/financy.svg';

export function AuthLayout() {
  return (
    <div className="0 flex min-h-svh w-full items-center justify-center bg-gray-100 p-6 md:p-10">
      <div className="w-full max-w-md">
        <img className="mx-auto mb-8 w-auto" src={financyImage} alt="Financy" />

        <Outlet />
      </div>
    </div>
  );
}
