import { Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 text-lg font-bold text-sidebar-foreground font-headline',
        className
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <Rocket className="h-5 w-5" />
      </div>
      <span className="truncate">Constellation ID</span>
    </div>
  );
}
