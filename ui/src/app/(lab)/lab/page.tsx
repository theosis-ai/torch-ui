// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col ml-[8rem] w-[90%] h-[90%]">
        <SidebarTrigger className="mt-8 mb-8"/>
        <div
          className="flex flex-col"
          style={{ border: "2px solid red" }}
        >
          <p>Main Content</p>
        </div>
      </main>
    </SidebarProvider>
  );
}
