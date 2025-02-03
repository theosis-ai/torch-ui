import { Icons } from "@/components/ui/icons";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-mono h-[50vh] space-y-8">
      <Link href="https://github.com/theosis-ai/tune-lab" target="_blank" rel="noopener noreferrer"><Icons.gitHub className="h-8 w-8 mb-8"/></Link>
      <h1 className="text-4xl font-medium tracking-wider">Tune Lab</h1>
      <p className="font-sans tracking-wider">a hopefully useful web app for torchtune</p>
    </div>
  );
}
