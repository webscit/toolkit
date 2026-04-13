import { createContext, useContext, useState, useId } from "react";
import "./command.css";

interface CommandContextValue {
  search: string;
  setSearch: (v: string) => void;
}

const CommandContext = createContext<CommandContextValue>({
  search: "",
  setSearch: () => undefined,
});

export function Command({ className, ...props }: React.ComponentProps<"div">) {
  const [search, setSearch] = useState("");
  return (
    <CommandContext.Provider value={{ search, setSearch }}>
      <div
        data-slot="command"
        className={`sct-command${className ? ` ${className}` : ""}`}
        {...props}
      />
    </CommandContext.Provider>
  );
}

export function CommandInput({
  className,
  onChange,
  ...props
}: React.ComponentProps<"input">) {
  const { setSearch } = useContext(CommandContext);
  return (
    <div
      data-slot="command-input-wrapper"
      className="sct-command-input-wrapper"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="sct-command-search-icon"
      >
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 11l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        data-slot="command-input"
        className={`sct-command-input${className ? ` ${className}` : ""}`}
        onChange={(e) => {
          setSearch(e.target.value);
          onChange?.(e);
        }}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="listbox"
      aria-label="Commands"
      data-slot="command-list"
      className={`sct-command-list${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-empty"
      className={`sct-command-empty${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export interface CommandGroupProps extends React.ComponentProps<"div"> {
  heading?: string;
}

export function CommandGroup({
  heading,
  className,
  children,
  ...props
}: CommandGroupProps) {
  const headingId = useId();
  return (
    <div
      role="group"
      aria-labelledby={heading ? headingId : undefined}
      data-slot="command-group"
      className={`sct-command-group${className ? ` ${className}` : ""}`}
      {...props}
    >
      {heading && (
        <div
          id={headingId}
          data-slot="command-group-heading"
          className="sct-command-group-heading"
        >
          {heading}
        </div>
      )}
      {children}
    </div>
  );
}

export interface CommandItemProps extends Omit<
  React.ComponentProps<"div">,
  "onSelect"
> {
  value?: string;
  onSelect?: (value: string) => void;
}

export function CommandItem({
  value = "",
  onSelect,
  className,
  ...props
}: CommandItemProps) {
  const { search } = useContext(CommandContext);
  const visible = !search || value.toLowerCase().includes(search.toLowerCase());

  if (!visible) return null;

  return (
    <div
      role="option"
      aria-selected={false}
      tabIndex={0}
      data-slot="command-item"
      data-value={value}
      className={`sct-command-item${className ? ` ${className}` : ""}`}
      onClick={() => onSelect?.(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(value);
        }
      }}
      {...props}
    />
  );
}

export function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      data-slot="command-separator"
      className={`sct-command-separator${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}

export function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={`sct-command-shortcut${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
