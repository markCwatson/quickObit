import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/Skeleton';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-my-color3 dark:bg-my-color10 m-2 shadow-sm shadow-my-color10 dark:shadow-my-color1 sm:rounded-lg overflow-hidden border dark:border-my-color1 border-my-color10',
        className,
      )}
      {...props}
    />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Header = function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('grid gap-1 px-3 pt-3 pb-3 sm:pt-6 ', className)}
      {...props}
    />
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Content = function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cn(
        'px-3 pt-3 pb-3 sm:pt-6 sm:pb-6 text-my-color10 dark:text-my-color1',
        className,
      )}
      {...props}
    />
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

Card.Footer = function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'px-3 border-t bg-my-color3 dark:bg-my-color9 text-my-color10 dark:text-my-color1',
        className,
      )}
      {...props}
    />
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Card.Title = function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h4
      className={cn(
        'text-lg font-medium text-my-color10 dark:text-my-color1',
        className,
      )}
      {...props}
    />
  );
};

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

Card.Description = function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-my-color10 dark:text-my-color1', className)}
      {...props}
    />
  );
};

Card.Skeleton = function CardSkeleton() {
  return (
    <Card>
      <Card.Header className="gap-2">
        <Skeleton className="h-5 w-1/5" />
        <Skeleton className="h-4 w-4/5" />
      </Card.Header>
      <Card.Content className="h-10" />
      <Card.Footer>
        <Skeleton className="h-8 w-[120px] bg-slate-200" />
      </Card.Footer>
    </Card>
  );
};
