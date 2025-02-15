"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import ModeSwitcher from "@workspace/ui/components/modeSwitcher";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between mt-8 ml-4 mr-4 mb-4 sm:ml-12 sm:mr-12">
      <div>
        <ModeSwitcher />
      </div>
      <div className="flex flex-1 justify-end">
        <Link
          href="/lab"
          className="btn flex gap-2 justify-center items-center"
        >
          Lab <LogIn height="18" width="18" />
        </Link>
      </div>
    </nav>
  );
}
