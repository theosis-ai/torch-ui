import { SignedOut } from "@clerk/nextjs";

export default function Footer() {
  return (
    <SignedOut>
      <footer>
        <p className="items-center flex flex-col text-xs mb-15">
          © {new Date().getFullYear()} Theosis AI
        </p>
      </footer>
    </SignedOut>
  );
}
