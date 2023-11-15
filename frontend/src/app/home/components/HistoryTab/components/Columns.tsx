'use client';

import { FuelSupply } from '@/services/api/fuel-supply/types/fuel-supply';
import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';

import { TableColumnHeader } from './TableColumnHeader';

export const columns: ColumnDef<FuelSupply>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <TableColumnHeader column={column} title="Data" />,
    cell: ({ row }) => (
      <div className="w-full">
        {new Date(row.getValue('createdAt')).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <TableColumnHeader column={column} title="Tipo" />,
    cell: ({ row }) => (
      <div className="w-full">
        <Badge variant="outline">{row.original.type.name}</Badge>
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <TableColumnHeader column={column} title="Preço" />,
    cell: ({ row }) => (
      <div className="w-full">
        {Number(row.getValue('price')).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => <TableColumnHeader column={column} title="Quantidade (Em Litros)" />,
    cell: ({ row }) => (
      <div className="w-full">
        {row.original.quantity > 1
          ? `${row.getValue('quantity')} Litros`
          : `${row.getValue('quantity')} Litro`}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => <TableColumnHeader column={column} title="Preço Final" />,
    cell: ({ row }) => (
      <div className="w-full">
        {Number(row.getValue('totalPrice')).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
];
