import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-mono mt-24">
      <h1 className="text-4xl font-medium tracking-wider mb-4">Tune Lab</h1>
      <p className="font-sans tracking-wider mb-4">
        a hopefully useful interface for torchtune
      </p>
    </div>
  );
}
