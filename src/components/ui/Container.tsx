import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-[1400px] mx-auto px-6 md:px-12", className)}>
      {children}
    </div>
  );
}
