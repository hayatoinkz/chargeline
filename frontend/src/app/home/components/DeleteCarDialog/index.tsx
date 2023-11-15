'use client';

import React from 'react';
import useCarActions from '@/hooks/car/use-car-actions';
import useCar from '@/hooks/car/user-car';
import { CarDelete } from '@/services/api/car';
import { CAR_URL } from '@/services/api/car/config';
import { Trash } from 'lucide-react';
import { mutate } from 'swr';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export function DeleteCarDialog(props: ButtonProps) {
  const { car } = useCar();
  const { setCar } = useCarActions();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onDelete() {
    setIsLoading(true);
    const response = await CarDelete(car!.id);

    if (response) {
      mutate(CAR_URL);
      setCar(null);
      setOpen(false);
      toast({
        title: 'Carro deletado com sucesso!',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Falha ao deletar carro!',
      });
    }

    setIsLoading(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="hidden md:inline-flex" asChild>
        <Button size="icon" variant="destructive" {...props}>
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogTrigger className="w-full md:hidden" asChild>
        <Button size="sm" variant="destructive" className="w-full" {...props}>
          <Trash className="mr-1 h-3 w-3" />
          Excluir Carro
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente seu veiculo de nossos
            servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm"
          >
            <Button variant="destructive" onClick={() => onDelete()}>
              {isLoading ? (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-200"></div>
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              Deletar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
