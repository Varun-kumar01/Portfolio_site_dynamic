import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const Development = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Development" title="Development initiatives and public projects." subtitle="Progress-focused efforts for infrastructure, welfare, and public service." />
        </div>
      </section>
    </MainLayout>
  )
}

export default Development
