"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    { id: "light", label: "Light", icon: <Sun size={18} /> },
    { id: "dark", label: "Dark", icon: <Moon size={18} /> },
    { id: "system", label: "System", icon: <Monitor size={18} /> },
  ];
  
  if (!mounted) {
    return (
      <div
        className="flex w-full items-center gap-1 rounded-full bg-muted p-1"
        aria-hidden="true"
      >
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 rounded-full bg-muted-foreground/30 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex w-full items-center gap-1 rounded-full bg-muted p-1">
        {themeOptions.map((option) => {
          const isActive = theme === option.id;
          return (
            <Tooltip key={option.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setTheme(option.id)}
                  aria-label={`Switch to ${option.label} theme`}
                  className={cn(
                    "flex w-full items-center justify-center rounded-full p-2 transition-colors duration-200 cursor-pointer",
                    isActive
                      ? "bg-background text-primary shadow-sm border border-muted-foreground/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  {option.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{option.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
