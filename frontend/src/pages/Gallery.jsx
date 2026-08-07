import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const Gallery = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Gallery" title="Photo gallery and public moments." subtitle="A curated gallery of events, visits, and community work." />
        </div>
      </section>
    </MainLayout>
  )
}

export default Gallery
