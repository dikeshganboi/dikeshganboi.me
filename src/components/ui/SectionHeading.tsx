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
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-accent">
          {label}
        </p>
      )}
      <div className="my-4 h-0.5 w-full bg-ink" />
      <h2 className="text-5xl leading-none text-ink sm:text-7xl">
        {title ?? children}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft">
          {subtitle}
        </p>
      )}
    </div>
  );
}
