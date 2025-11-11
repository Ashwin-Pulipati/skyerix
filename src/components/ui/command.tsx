"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";

/* Root */

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Search",
  description = "Type to search.",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle id="command-title">{title}</DialogTitle>
        <DialogDescription id="command-description">
          {description}
        </DialogDescription>
      </DialogHeader>

      {/* pt-10 ensures any outer close button won't overlap the input */}
      <DialogContent
        className={cn("overflow-hidden p-0 pt-10", className)}
        showCloseButton={showCloseButton}
        aria-labelledby="command-title"
        aria-describedby="command-description"
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}


function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  const value =
    (props as any).value ??
    (typeof (props as any).defaultValue === "string"
      ? (props as any).defaultValue
      : "");

  const onClear = () => {
    const onValueChange =
      (props as any).onValueChange || (props as any).onChange;
    if (onValueChange) onValueChange("");
  };

  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        "relative m-2 mt-4 flex h-9 items-center gap-2 rounded-full border border-input bg-background px-3 pr-2",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/60"
      )}
    >
      <SearchIcon className="size-4 shrink-0 text-primary" aria-hidden="true" />
      <CommandPrimitive.Input
        id="command-search"
        aria-label="Search"
        aria-autocomplete="list"
        aria-controls="command-list"
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground placeholder:font-sans flex h-10 w-full rounded-md bg-transparent py-3 pr-8 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 caret-primary",
          className
        )}
        {...props}
      />

      {value?.length > 0 && (
        <div className="absolute right-2">
          <Button
            type="button"
            variant="destructive"
            size="icon-sm"
            onClick={onClear}
            aria-label="Clear search"
            className="rounded-full bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground"
            title="Clear search"
          >
            <XCircle className="h-4 w-4 text-current" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}


function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      id="command-list"
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
        className
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      role="status"
      aria-live="polite"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "text-foreground overflow-hidden p-1",
        "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
        "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        "[&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex select-none cursor-default items-center gap-2 rounded-full px-2 py-1.5 text-sm outline-hidden",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
