import { cn } from "@/lib/utils";

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      aria-hidden="true"
      className={cn("text-primary", className)}
    >
      <path
        fill="currentColor"
        d="M32 4c1.2 6.4 4.8 11.4 10.6 14.6-6 .8-10.8 4.6-13.2 10.2C27.2 23.2 22.4 19.4 16.4 18.6 22.2 15.4 25.8 10.4 32 4Z"
        opacity="0.95"
      />
      <path
        fill="currentColor"
        d="M12 18c4.6 2.2 8 6 10 11.2C16.8 27.4 11.2 26 6 26c2.8-3.6 5.2-6.8 6-8Z"
        opacity="0.7"
      />
      <path
        fill="currentColor"
        d="M52 18c-.8 1.2-3.2 4.4-6 8-5.2 0-10.8 1.4-16 3.2 2-5.2 5.4-9 10-11.2Z"
        opacity="0.7"
      />
      <path
        fill="currentColor"
        d="M32 18.5c2.8 3.4 4.4 7.4 4.2 11.6-1.3-1.2-2.7-1.8-4.2-1.8s-2.9.6-4.2 1.8c-.2-4.2 1.4-8.2 4.2-11.6Z"
        opacity="0.85"
      />
      <circle cx="32" cy="32" r="2.4" fill="currentColor" />
    </svg>
  );
}
