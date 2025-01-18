import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// Base DropdownMenu component
const DropdownMenu = DropdownMenuPrimitive.Root;

// Trigger for the dropdown
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// Grouping items in the dropdown
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

// Portal for the dropdown (useful for rendering dropdown in a separate layer)
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

// Submenu functionality
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

// Radio group inside the dropdown for grouping radio items
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Submenu trigger
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex items-center rounded-md px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
      inset && "pl-8",
      className
    )}
    {...props}>
    {children}
    <ChevronRight className="ml-auto h-4 w-4 text-gray-500" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

// Submenu content
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-lg transition-transform ease-in-out duration-200",
      className
    )}
    {...props} />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

// Main dropdown content
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal className="">
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-white shadow-lg transition-transform ease-in-out duration-200",
        className
      )}
      {...props} />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// Menu item
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex items-center rounded-md px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
      inset && "pl-8",
      className
    )}
    {...props} />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// Checkbox item
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex items-center rounded-md py-2 pl-8 pr-4 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-blue-500" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

// Radio item
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex items-center rounded-md py-2 pl-8 pr-4 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none",
      className
    )}
    {...props}>
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 text-blue-500" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// Label for items inside dropdown
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-4 py-2 text-sm font-semibold text-gray-700", inset && "pl-8", className)}
    {...props} />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// Separator between items
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-gray-200", className)}
    {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// Shortcut text for menu items
const DropdownMenuShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs text-gray-500", className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
