import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-4xl font-medium tracking-wider">Tune Lab</h1>
        <p className="font-sans tracking-wider">a hopefully useful interface for torchtune</p>
        <div className="flex flex-col gap-3 items-center text-center">
          <Link href="https://github.com/pytorch/torchtune" className="items-center flex gap-1">
            {`torchtune`} <ExternalLink height="12" width="12"/>
          </Link>
          <Link href="https://github.com/vercel/next.js" className="items-center flex gap-1">
            {`nextjs`} <ExternalLink height="12" width="12"/>
          </Link>
          <Link href="https://ui.shadcn.com" className="items-center flex gap-1">
            {`shadcn/ui`} <ExternalLink height="12" width="12"/>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/sign-in" className="btn">
            SignIn
          </Link>
        </div>
      </main>
    </div>
  );
}
