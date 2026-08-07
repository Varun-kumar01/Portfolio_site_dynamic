import MainLayout from '../layouts/MainLayout'
import SectionTitle from '../components/common/SectionTitle'

const Dashboard = () => {
  return (
    <MainLayout>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Dashboard" title="Admin dashboard." subtitle="Manage content for the public portfolio." />
        </div>
      </section>
    </MainLayout>
  )
}

export default Dashboard
