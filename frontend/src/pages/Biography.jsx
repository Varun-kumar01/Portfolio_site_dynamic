import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const Biography = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Biography" title="Biography and public life overview." subtitle="A concise overview of the leader's journey and values." />
        </div>
      </section>
    </MainLayout>
  )
}

export default Biography
