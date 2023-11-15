'use client';

import withPageRequiredAuth from '@/hooks/auth/with-page-required-auth';
import useCar from '@/hooks/car/user-car';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { DeleteCarDialog } from './components/DeleteCarDialog';
import { EditCarDialog } from './components/EditCarDialog';
import HistoryTab from './components/HistoryTab';
import RegisterTab from './components/RegisterTab';
import { UserNav } from './components/UserNav';

function HomePage() {
  const { car } = useCar();

  return (
    <div className="h-full space-y-8 px-4 py-8 lg:px-8">
      <div className="inline-flex w-full items-center justify-between">
        <h1 className="font-display text-xl font-bold tracking-tight md:text-3xl">Abastecimento</h1>
        <div className="hidden lg:block">
          <UserNav />
        </div>
      </div>
      {car && (
        <Badge
          variant="secondary"
          className="font-display hidden w-full flex-col justify-center gap-2 py-2 text-base font-light md:flex-row md:text-lg lg:flex"
        >
          <span className="flex w-full items-center justify-center gap-2">
            Abastecendo{' '}
            <b className="font-bold">
              {car.brand} {car.model}
            </b>
          </span>
          <div className="flex w-full flex-col gap-2 md:w-fit md:flex-row">
            <EditCarDialog />
            <DeleteCarDialog />
          </div>
        </Badge>
      )}
      <Tabs defaultValue="register" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="register" className="relative">
              Registro
            </TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
        </div>
        <RegisterTab />
        <HistoryTab />
      </Tabs>
    </div>
  );
}

export default withPageRequiredAuth(HomePage);
