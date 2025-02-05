"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import ModeSwitcher from "@/components/modeSwitcher";

export default function Nav() {
  const pathname = usePathname();
  if (pathname === "/lab") return null;

  return (
      <nav className="flex items-center justify-between mt-8 ml-4 mr-4 mb-4 sm:ml-12 sm:mr-12">
        <div>
          <ModeSwitcher />
        </div>
        <div className="flex flex-1 justify-left gap-6 ml-4">
          <Link href="/">Home</Link>
          <SignedIn>
            <Link className="items-center flex gap-1" href="/lab">
              Tune Lab
            </Link>
          </SignedIn>
        </div>
        <div className="flex flex-1 justify-end">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Link
                href="/sign-in"
                className="btn flex gap-2 justify-center items-center"
              >
                Sign In <LogIn height="18" width="18" />
              </Link>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
  );
}
