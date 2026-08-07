import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const Articles = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Articles" title="Articles and thought pieces." subtitle="Perspectives on governance, society, and leadership." />
        </div>
      </section>
    </MainLayout>
  )
}

export default Articles
