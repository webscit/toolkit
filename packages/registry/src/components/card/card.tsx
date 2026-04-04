import './card.css';

export interface CardProps extends React.ComponentProps<'div'> {}
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={`sct-card${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.ComponentProps<'div'> {}
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={`sct-card-header${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface CardTitleProps extends React.ComponentProps<'div'> {}
export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={`sct-card-title${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface CardDescriptionProps extends React.ComponentProps<'div'> {}
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={`sct-card-description${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface CardContentProps extends React.ComponentProps<'div'> {}
export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={`sct-card-content${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}

export interface CardFooterProps extends React.ComponentProps<'div'> {}
export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={`sct-card-footer${className ? ` ${className}` : ''}`}
      {...props}
    />
  );
}
