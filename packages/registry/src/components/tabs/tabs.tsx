import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import "./tabs.css";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabsProps extends React.ComponentProps<typeof BaseTabs.Root> {}
export function Tabs({ className, ...props }: TabsProps) {
  return (
    <BaseTabs.Root
      data-slot="tabs"
      className={`sct-tabs${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabsListProps extends React.ComponentProps<
  typeof BaseTabs.List
> {}
export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <BaseTabs.List
      data-slot="tabs-list"
      className={`sct-tabs-list${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabsTriggerProps extends React.ComponentProps<
  typeof BaseTabs.Tab
> {}
export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <BaseTabs.Tab
      data-slot="tabs-trigger"
      className={`sct-tabs-trigger${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabsContentProps extends React.ComponentProps<
  typeof BaseTabs.Panel
> {}
export function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <BaseTabs.Panel
      data-slot="tabs-content"
      className={`sct-tabs-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
