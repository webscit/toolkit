import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Separator } from "../separator/separator";
import { Skeleton } from "../skeleton/skeleton";
import { Sheet, SheetContent } from "../sheet/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip/tooltip";
import "./sidebar.css";

// ---- Context ----

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  state: "expanded" | "collapsed";
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
}

// ---- Provider ----

export interface SidebarProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SidebarProvider({
  defaultOpen = true,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches,
  );

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      onOpenChange?.(value);
      if (controlledOpen === undefined) {
        setUncontrolledOpen(value);
      }
    },
    [controlledOpen, onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const value = useMemo(
    () => ({ open, setOpen, toggleSidebar, isMobile, state }),
    [open, setOpen, toggleSidebar, isMobile, state],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-provider"
        data-sidebar-state={state}
        className={`sct-sidebar-provider${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

// ---- Main Sidebar ----

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarProps) {
  const { open, setOpen, isMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <aside
        data-slot="sidebar"
        data-side={side}
        data-variant={variant}
        data-collapsible="none"
        className={`sct-sidebar${className ? ` ${className}` : ""}`}
        {...props}
      >
        {children}
      </aside>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={side}
          className={`sct-sidebar sct-sidebar-mobile${className ? ` ${className}` : ""}`}
          {...props}
        >
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      data-slot="sidebar"
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-state={open ? "expanded" : "collapsed"}
      className={`sct-sidebar${className ? ` ${className}` : ""}`}
      {...props}
    >
      <div className="sct-sidebar-inner">{children}</div>
    </aside>
  );
}

// ---- Trigger ----

export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      data-slot="sidebar-trigger"
      className={`sct-sidebar-trigger${className ? ` ${className}` : ""}`}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    />
  );
}

// ---- Rail ----

export type SidebarRailProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarRail({
  className,
  onClick,
  ...props
}: SidebarRailProps) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      data-slot="sidebar-rail"
      className={`sct-sidebar-rail${className ? ` ${className}` : ""}`}
      tabIndex={-1}
      aria-label="Toggle sidebar"
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    />
  );
}

// ---- Inset ----

export type SidebarInsetProps = React.HTMLAttributes<HTMLElement>;

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <main
      data-slot="sidebar-inset"
      className={`sct-sidebar-inset${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// ---- Sections ----

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      data-slot="sidebar-header"
      className={`sct-sidebar-section-header${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarContentProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      className={`sct-sidebar-section-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      data-slot="sidebar-footer"
      className={`sct-sidebar-section-footer${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;

export function SidebarSeparator(props: SidebarSeparatorProps) {
  return <Separator data-slot="sidebar-separator" {...props} />;
}

// ---- Group ----

export type SidebarGroupProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      data-slot="sidebar-group"
      className={`sct-sidebar-group${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarGroupLabelProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarGroupLabel({
  className,
  ...props
}: SidebarGroupLabelProps) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={`sct-sidebar-group-label${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarGroupActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarGroupAction({
  className,
  ...props
}: SidebarGroupActionProps) {
  return (
    <button
      data-slot="sidebar-group-action"
      className={`sct-sidebar-group-action${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarGroupContentProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarGroupContent({
  className,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={`sct-sidebar-group-content${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

// ---- Menu ----

export type SidebarMenuProps = React.HTMLAttributes<HTMLUListElement>;

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={`sct-sidebar-menu${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarMenuItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={`sct-sidebar-menu-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  tooltip?: string;
}

export function SidebarMenuButton({
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const button = (
    <button
      data-slot="sidebar-menu-button"
      data-active={isActive ? "" : undefined}
      data-variant={variant}
      data-size={size}
      className={`sct-sidebar-menu-button${className ? ` ${className}` : ""}`}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={button} />
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export type SidebarMenuActionProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SidebarMenuAction({
  className,
  ...props
}: SidebarMenuActionProps) {
  return (
    <button
      data-slot="sidebar-menu-action"
      className={`sct-sidebar-menu-action${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarMenuBadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function SidebarMenuBadge({
  className,
  ...props
}: SidebarMenuBadgeProps) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={`sct-sidebar-menu-badge${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SidebarMenuSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean;
}

export function SidebarMenuSkeleton({
  showIcon = false,
  className,
  ...props
}: SidebarMenuSkeletonProps) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      className={`sct-sidebar-menu-skeleton${className ? ` ${className}` : ""}`}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="sct-sidebar-menu-skeleton-icon"
          style={{ width: "1rem", height: "1rem" }}
        />
      )}
      <Skeleton
        className="sct-sidebar-menu-skeleton-text"
        style={{ height: "0.75rem", flex: 1 }}
      />
    </div>
  );
}

export type SidebarMenuSubProps = React.HTMLAttributes<HTMLUListElement>;

export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={`sct-sidebar-menu-sub${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export type SidebarMenuSubItemProps = React.LiHTMLAttributes<HTMLLIElement>;

export function SidebarMenuSubItem({
  className,
  ...props
}: SidebarMenuSubItemProps) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={`sct-sidebar-menu-sub-item${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function SidebarMenuSubButton({
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  return (
    <button
      data-slot="sidebar-menu-sub-button"
      data-active={isActive ? "" : undefined}
      className={`sct-sidebar-menu-sub-button${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
