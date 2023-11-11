import { GasStation, Icon as IconsaxType } from 'iconsax-react';
import React from 'react';

interface Props {
  icon?: IconsaxType;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptySlot({
  icon = GasStation,
  title = 'Sem abastecimentos',
  description = 'Você não possui nenhum registro de abastecimento. Adicioneum na aba "Registro".',
  children,
}: Readonly<Props>) {

  const Icon = React.createElement(icon, { className: "h-9 w-9 text-zinc-500" });

  return (
    <div className="px-4 py-12 w-full rounded-xl border border-dashed border-zinc-200 justify-center items-center gap-4 flex flex-col">
      {Icon}
      <div className="flex-col justify-center items-center gap-2 flex text-center">
        <h4 className=" text-zinc-900 text-lg font-semibold leading-tight">
          {title}
        </h4>
        <p className=" text-zinc-500 text-xs leading-tight">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
