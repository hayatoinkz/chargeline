import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Register from './@register/page';
import History from './@history/page';
import { Badge } from '@/components/ui/badge';

interface HomeProps {
  children: React.ReactNode;
}

export default function Home(props: Readonly<HomeProps>) {
  return (
    <div className="h-full px-4 py-8 lg:px-8 space-y-8">
      <h1 className="text-3xl font-display font-bold tracking-tight">
        Abastecimento
      </h1>
      <Badge variant="secondary" className="font-display font-light text-xl w-full inline-flex justify-center h-10">
        <span>
          Abastecendo <b className="font-bold"> Nissan Kicks</b>
        </span>
      </Badge>
      <Tabs defaultValue="register" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="register" className="relative">
              Registro
            </TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
        </div>
        <Register />
        <History />
      </Tabs>
      {props.children}
    </div>
  );
}
