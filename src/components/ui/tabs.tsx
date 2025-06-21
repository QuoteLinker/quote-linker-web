import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>((props, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    {...props}
    className={`data-[state=active]:bg-white ${props.className || ""}`}
  />
));
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>((props, ref) => (
  <TabsPrimitive.List
    ref={ref}
    {...props}
    className={`inline-flex items-center justify-center rounded-lg bg-gray-100 p-1 ${
      props.className || ""
    }`}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>((props, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    {...props}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm ${
      props.className || ""
    }`}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>((props, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    {...props}
    className={`mt-2 ${props.className || ""}`}
  />
));
TabsContent.displayName = "TabsContent";
