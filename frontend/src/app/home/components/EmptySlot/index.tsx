import React from 'react';
import { GasStation, Icon as IconsaxType } from 'iconsax-react';

interface Props {
  icon?: IconsaxType;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function EmptySlot({
  icon = GasStation,
  title = 'Sem abastecimentos',
  description = 'Você não possui nenhum registro de abastecimento. Adicione um na aba "Registro".',
  children,
}: Readonly<Props>) {
  const Icon = React.createElement(icon, {
    className: 'h-9 w-9 text-zinc-500',
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-zinc-200 px-4 py-12">
      {Icon}
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h4 className=" text-lg font-semibold leading-tight text-zinc-900">{title}</h4>
        <p className=" text-xs leading-tight text-zinc-500">{description}</p>
      </div>
      {children}
    </div>
  );
}
