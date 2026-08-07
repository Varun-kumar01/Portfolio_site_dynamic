import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const News = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="News" title="Latest news and public statements." subtitle="A dedicated space for updates, announcements, and media coverage." />
        </div>
      </section>
    </MainLayout>
  )
}

export default News
