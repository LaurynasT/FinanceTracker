import type { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-50 h-40 rounded-sm shadow-xl/30 mt-6 bg-white mb-5">
      {children}
    </div>
  );
}