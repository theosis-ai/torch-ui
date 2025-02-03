import { Icons } from "@/components/ui/icons";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-mono h-[50vh]">
      <Link
        href="https://github.com/theosis-ai/tune-lab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icons.gitHub className="h-8 w-8 mb-10" />
      </Link>
      <h1 className="text-4xl font-medium tracking-wider mb-2">Tune Lab</h1>
      <p className="font-sans tracking-wider mb-12">
        a hopefully useful web app for torchtune
      </p>
      <div className="flex flex-col items-center gap-1.5 space-y-2">
      <Link
        className="items-center flex gap-1"
        href="https://github.com/pytorch/torchtune"
        target="_blank"
      >
        {`torchtune`} <ExternalLink height="12" width="12" />
      </Link>
      </div>
    </div>
  );
}
