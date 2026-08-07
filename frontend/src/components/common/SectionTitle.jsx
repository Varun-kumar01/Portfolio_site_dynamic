export default function SectionTitle({
  subtitle,
  title,
  description,
  center = false,
}) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {subtitle && (
        <span className="uppercase tracking-[0.25em] text-orange-600 font-semibold text-sm">
          {subtitle}
        </span>
      )}

      <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-gray-600 leading-8">
          {description}
        </p>
      )}
    </div>
  );
}