import { Heart } from 'lucide-react';

export function Logo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Heart className="w-8 h-8 text-primary animate-pulse" strokeWidth={1.5} />
        <Heart 
          className="w-8 h-8 text-primary absolute top-0 left-0 opacity-50" 
          strokeWidth={1.5}
          style={{ transform: 'scale(1.2)' }}
        />
      </div>
      {!collapsed && (
        <span className="font-[var(--font-logo)] font-bold text-2xl text-foreground">
          Curely
        </span>
      )}
    </div>
  );
}