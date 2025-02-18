"use client";

import { LogIn } from "lucide-react";
import { ModeSwitcher } from "@workspace/ui/components/modeSwitcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu";

export default function Nav() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container-wrapper">
      <div className="container flex h-14 items-center">
      <NavigationMenu className="flex items-center gap-4 text-sm xl:gap-6">
      
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/lab">
            Lab
            <LogIn height="18" width="18" />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    {/* mode switcher */}
    <nav className="flex items-center gap-0.5">
    <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
      <ModeSwitcher />
    </div>
    </nav>
    

    
    </div>
      </div>
    </header>
  );
}
