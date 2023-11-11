import { EmptySlot } from '@/components/app/emptyslot';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TabsContent } from '@/components/ui/tabs';
import { GasStation } from 'iconsax-react';

enum FuelType {
  gasoline = 'Gasolina',
  ethanol = 'Etanol',
  diesel = 'Diesel',
}

type FuelHistory = {
  id: string;
  createdAt: string;
  type: string;
  price: number;
  quantity: number;
  totalAmount: number;
};

const history: FuelHistory[] = [
  {
    id: '1',
    createdAt: '2023-11-10T03:00:00Z',
    type: 'gasoline',
    price: 6.52,
    quantity: 12,
    totalAmount: 78.25,
  },
  {
    id: '2',
    createdAt: '2023-11-10T03:00:00Z',
    type: 'gasoline',
    price: 6.52,
    quantity: 12,
    totalAmount: 78.25,
  },
  {
    id: '3',
    createdAt: '2023-11-10T03:00:00Z',
    type: 'gasoline',
    price: 6.52,
    quantity: 12,
    totalAmount: 78.25,
  },
];

export default function History() {
  return (
    <TabsContent
      value="history"
      className="border-none p-0 outline-none space-y-6"
    >
      <div className="space-y-6">
        <h2 className="text-xl font-display font-semibold tracking-tight">
          Estatísticas
        </h2>
        {!history ||
          (history.length == 0 && (
            <EmptySlot />
          ))}
      </div>
      <div className="space-y-6">
        <h2 className="text-xl font-display font-semibold tracking-tight">
          Histórico de Abastecimento
        </h2>
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Preço do Combustível</TableHead>
                <TableHead>Quantidade (Em Litros)</TableHead>
                <TableHead className="text-right">Preço Final</TableHead>
              </TableRow>
            </TableHeader>

            {history && history.length > 0 && (
              <TableBody>
                {history.map((refuel) => (
                  <TableRow key={refuel.id}>
                    <TableCell>
                      {new Date(refuel.createdAt).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>{FuelType.gasoline}</TableCell>
                    <TableCell>
                      {refuel.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell>
                      {refuel.quantity > 1
                        ? `${refuel.quantity} Litros`
                        : `${refuel.quantity} Litro`}
                    </TableCell>
                    <TableCell className="text-right">
                      {refuel.totalAmount.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {!history ||
            (history.length == 0 && (
              <EmptySlot />
            ))}
        </div>
      </div>
    </TabsContent>
  );
}
