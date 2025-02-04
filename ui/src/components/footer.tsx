import { SignedOut } from '@clerk/nextjs';

export default function Footer() {
    return (
        <SignedOut>
        <footer className="mt-auto">
          <p className="text-neutral-600 dark:text-neutral-300 items-center flex flex-col gap-1 text-xs">
            © {new Date().getFullYear()} Theosis AI
          </p>
      </footer>
      </SignedOut>
    )
}