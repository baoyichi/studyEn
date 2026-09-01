import type { PropsWithChildren } from "react";

export function Notebook({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={`notebook ${className}`}>
      <div className="notebook__cover" aria-hidden="true" />
      <div className="notebook__rings" aria-hidden="true">
        {Array.from({ length: 11 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="notebook__page">{children}</div>
    </section>
  );
}
