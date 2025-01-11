"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuIcon, Sun, Moon, Globe } from "lucide-react";
import { navigation } from "./navigation";
import { Logo } from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

export function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme: currentTheme, setTheme } = useTheme();
  const { language, setLanguage } = useI18n();
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={`bg-card border-r transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-4">
          <Logo collapsed={collapsed} />
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-1 p-2">
            {navigation.map((item) => {
              const isActive =
                pathname === `/${item.key === "dashboard" ? "" : item.key}`;
              return (
                <Link
                  key={item.key}
                  href={`/${item.key === "dashboard" ? "" : item.key}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </aside>
      <div className="flex-1">
        <header className="h-14 border-b flex items-center justify-between px-4 bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
            >
              {currentTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLanguage(language === "en" ? "my" : "en")}
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
