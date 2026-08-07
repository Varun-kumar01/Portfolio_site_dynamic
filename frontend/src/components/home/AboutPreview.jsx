import SectionTitle from '../common/SectionTitle'

const AboutPreview = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="About" title="A public life defined by commitment and responsibility." subtitle="Focused on people, policy, and long-term development." />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Mission</h3>
            <p className="mt-3 text-slate-600">Delivering service with integrity, transparent governance, and measurable progress.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Public Values</h3>
            <p className="mt-3 text-slate-600">Community-first leadership, accessibility, and respect for every citizen.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
