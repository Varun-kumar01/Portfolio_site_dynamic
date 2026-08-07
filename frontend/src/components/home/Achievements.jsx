import SectionTitle from '../common/SectionTitle'

const items = [
  { title: 'Public Service', text: 'Dedicated years of service across communities and institutions.' },
  { title: 'Policy Leadership', text: 'Shaped initiatives rooted in practical reform and accountability.' },
  { title: 'Development Focus', text: 'Supported civic progress and grassroots empowerment.' },
]

const Achievements = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Achievements" title="Milestones that reflect sustained public commitment." subtitle="A record of purpose-driven leadership and measurable impact." />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
