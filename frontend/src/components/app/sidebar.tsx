import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlusCircleIcon, UserIcon, ZapIcon } from 'lucide-react';
import { Car, GasStation } from 'iconsax-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        'h-full max-h-screen w-[275px] fixed bg-background top-0 pb-6',
        className
      )}
    >
      <div className="space-y-6 px-6 py-8">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/assets/img/logo.svg"
          alt="ChargeLine Logo"
          width={150}
          height={36}
          priority
        />
        <div className="space-y-1 my-6">
          <Button variant="secondary" className="w-full justify-start">
            <ZapIcon className="mr-2 h-4 w-4" />
            Abastecimento
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <UserIcon className="mr-2 h-4 w-4" />
            Conta
          </Button>
        </div>
        <div className="py-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="relative font-display text-lg font-light tracking-tight">
              Meus <b className="font-bold">Carros</b>
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <PlusCircleIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adicionar Carro</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CarSection cars={[{ name: 'Nissan' }, { name: 'Teste' }]} />
        </div>
      </div>
    </div>
  );
}

function CarSection({ cars }: Readonly<{ cars?: { name: string }[] }>) {
  if (!cars || cars.length == 0) {
    return (
      <div className="px-4 py-12 rounded-xl border border-dashed border-zinc-200 justify-center items-center gap-4 flex flex-col">
        <Car variant="Outline" className="h-6 w-6 text-zinc-500" />
        <div className="flex-col justify-center items-center gap-2 flex text-center">
          <h4 className=" text-zinc-900 text-sm font-semibold leading-tight">
            Sem carros na garagem
          </h4>
          <p className=" text-zinc-500 text-xs leading-tight">
            Você não possui nenhum carro registrado. Adicione no botão acima.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {cars.map(car =>
        <div
          key={car.name}
          className={cn(
            'p-4 rounded-xl border border-dashed border-zinc-200 justify-center items-center gap-4 flex flex-col w-full',
            {}
          )}
        >
          <header className="inline-flex gap-2 w-full">
            <div className="rounded-lg bg-zinc-100 h-12 w-20"></div>
            <div className="space-y-0">
              <h3 className="font-bold">Nissan</h3>
              <p className="text-zinc-500">Kicks</p>
            </div>
          </header>
          <div className="inline-flex justify-between items-end w-full">
            <div className="space-y-1">
              <p className="text-xs text-zinc-500">Placa do Veículo</p>
              <h3 className="text-xl font-bold">JJJ-78678</h3>
            </div>
            <div
              className={cn(
                'inline-flex w-10 h-10 p-2 bg-zinc-900 rounded-md justify-center items-center'
              )}
            >
              <GasStation variant="Outline" className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>)}
    </div>
  );
}
