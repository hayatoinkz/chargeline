import Image from 'next/image';

function Loading() {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          className="relative"
          src="/assets/img/logo.svg"
          alt="ChargeLine Logo"
          width={156}
          height={64}
          priority
        />
        <div className="inline-flex items-center justify-center gap-2">
          <div className="mr-4 h-5 w-5 animate-spin rounded-full border-2 border-zinc-400 border-t-zinc-200"></div>
          <p className="text-lg font-light">Carregando...</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
