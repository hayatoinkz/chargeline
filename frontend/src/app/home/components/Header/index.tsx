'use client';

import Image from 'next/image';
import useCar from '@/hooks/car/user-car';

import { DeleteCarDialog } from '../DeleteCarDialog';
import { EditCarDialog } from '../EditCarDialog';
import { UserNav } from '../UserNav';

export default function Header() {
  const { car } = useCar();

  return (
    <header className="bg-background sticky left-0 top-0 z-50 flex flex-col lg:hidden">
      <div className="flex h-16 items-center border-b px-4">
        <Image src="/assets/img/logo.svg" alt="ChargeLine Logo" width={128} height={16} priority />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      {car && (
        <div className="font-display flex w-full flex-col justify-center gap-2 border-b bg-zinc-50 p-2 text-base font-light md:flex-row md:text-lg">
          <span className="flex w-full items-center justify-center gap-2">
            Abastecendo{' '}
            <b className="font-bold">
              {car.brand} {car.model}
            </b>
          </span>
          <div className="flex w-full gap-2 md:w-fit md:flex-row">
            <EditCarDialog />
            <DeleteCarDialog />
          </div>
        </div>
      )}
    </header>
  );
}
