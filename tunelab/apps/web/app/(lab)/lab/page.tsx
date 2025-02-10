import { SidebarTrigger } from "@workspace/ui/components/sidebar";

export default function Page() {
  return (
    <div className="p-4">
      <SidebarTrigger className="mb-4" />
      <div className="rounded-lg border p-4">
        <p>an eventual interactive playground</p>
      </div>
    </div>
  );
}
