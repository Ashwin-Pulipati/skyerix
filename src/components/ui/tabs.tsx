"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        // Typography + color from globals.css
        "font-sans text-md leading-[var(--line-height)] text-foreground",
        // Layout
        "flex flex-col gap-2",
        className
      )}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // Container uses muted bg & rounded pill, with border for contrast
        "inline-flex h-9 w-fit items-center justify-center rounded-full p-[3px]",
        "bg-muted text-muted-foreground border border-input",
        // Focus ring for keyboard nav
        "focus-within:ring-2 focus-within:ring-primary/50 focus-within:outline-none",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Size & layout
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5",
        "px-3 py-1 rounded-full whitespace-nowrap",
        // Typography & icon behavior
        "text-foreground dark:text-muted-foreground text-sm font-medium",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Default + hover
        "border border-transparent transition-[color,box-shadow,background-color]",
        "hover:text-foreground",
        // Active/selected state mirrors your tokens
        "data-[state=active]:bg-primary data-[state=active]:text-background",
        "dark:data-[state=active]:bg-primary dark:data-[state=active]:text-background",
        "data-[state=active]:shadow-sm",
        // Focus visibility (WCAG)
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        // Respect typography + color scale
        "flex-1 outline-none font-sans text-md leading-[var(--line-height)] text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
