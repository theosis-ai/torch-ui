// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import { SidebarProvider, SidebarTrigger } from "@/components/sidebar/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col p-8 w-screen h-screen">
        <SidebarTrigger />
        <div
          className="flex flex-col items-center p-8 h-full w-full ml-[18rem]"
          style={{ border: "2px solid red" }}
        >
          <p>Main Content</p>
        </div>
      </main>
    </SidebarProvider>
  );
}
