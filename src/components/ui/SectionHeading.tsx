interface SectionHeadingProps {
  label?: string;
  title?: string;
  subtitle?: string;
  children?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  children,
}: SectionHeadingProps) {
  return (
    <div>
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
        {title ?? children}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
