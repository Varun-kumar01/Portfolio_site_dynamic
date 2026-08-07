const SectionTitle = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="max-w-3xl mb-10">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-slate-600">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle
