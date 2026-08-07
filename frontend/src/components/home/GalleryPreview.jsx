import SectionTitle from '../common/SectionTitle'

const GalleryPreview = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Gallery" title="Moments from public life and community engagement." subtitle="A visual record of service, outreach, and civic participation." />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-56 rounded-3xl border border-slate-200 bg-slate-200" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryPreview
