import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Spinner({ className, size = "md" }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={cn(
        "border-neutral-300 border-t-neutral-800 rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
    ></div>
  );
}
