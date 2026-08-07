import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const Videos = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Videos" title="Video library and public appearances." subtitle="A collection of speeches, interviews, and event highlights." />
        </div>
      </section>
    </MainLayout>
  )
}

export default Videos
